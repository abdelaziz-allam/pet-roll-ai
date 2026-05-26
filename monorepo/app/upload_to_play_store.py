#!/usr/bin/env python3
"""
PET Roll - Google Play Store Upload Script

This script uploads the release AAB to Google Play Store.
Prerequisites: App must be created in Play Console first.
"""

import json
import os
import sys
import time

from google.oauth2 import service_account
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SERVICE_ACCOUNT_KEY = '/tmp/play-publisher-key.json'
PACKAGE_NAME = 'com.petroll.app'
AAB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        'build/app/outputs/bundle/release/app-release.aab')

def get_service():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_KEY,
        scopes=['https://www.googleapis.com/auth/androidpublisher']
    )
    return build('androidpublisher', 'v3', credentials=credentials)

def check_app_exists(service):
    try:
        edit = service.edits().insert(packageName=PACKAGE_NAME, body={}).execute()
        service.edits().delete(packageName=PACKAGE_NAME, editId=edit['id']).execute()
        return True
    except Exception as e:
        if '404' in str(e):
            return False
        raise

def upload_aab(service):
    print(f"\n[1/4] Creating edit...")
    edit = service.edits().insert(packageName=PACKAGE_NAME, body={}).execute()
    edit_id = edit['id']
    print(f"  Edit ID: {edit_id}")

    print(f"\n[2/4] Uploading AAB ({os.path.getsize(AAB_PATH)/1024/1024:.1f} MB)...")
    media = MediaFileUpload(AAB_PATH, mimetype='application/octet-stream', resumable=True)

    request = service.edits().bundles().upload(
        packageName=PACKAGE_NAME,
        editId=edit_id,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"  Upload progress: {int(status.progress() * 100)}%")

    version_code = response['versionCode']
    print(f"  Uploaded! Version code: {version_code}")

    print(f"\n[3/4] Assigning to internal testing track...")
    service.edits().tracks().update(
        packageName=PACKAGE_NAME,
        editId=edit_id,
        track='internal',
        body={
            'track': 'internal',
            'releases': [{
                'versionCodes': [str(version_code)],
                'status': 'completed',
                'releaseNotes': [{
                    'language': 'en-US',
                    'text': 'Initial release of PET Roll:\n'
                           '- Pet profile management with photos\n'
                           '- Vaccination tracking & smart reminders\n'
                           '- Complete medical history timeline\n'
                           '- Pregnancy tracking with milestones\n'
                           '- Mating marketplace for breeders\n'
                           '- In-app chat & push notifications'
                }]
            }]
        }
    ).execute()
    print(f"  Assigned to internal testing track!")

    print(f"\n[4/4] Committing edit...")
    service.edits().commit(packageName=PACKAGE_NAME, editId=edit_id).execute()
    print(f"  Edit committed successfully!")

    return version_code

def main():
    print("=" * 55)
    print("  PET Roll - Google Play Store Upload")
    print("=" * 55)

    if not os.path.exists(AAB_PATH):
        print(f"\nERROR: AAB not found at {AAB_PATH}")
        print("Run: flutter build appbundle --release")
        sys.exit(1)

    if not os.path.exists(SERVICE_ACCOUNT_KEY):
        print(f"\nERROR: Service account key not found at {SERVICE_ACCOUNT_KEY}")
        sys.exit(1)

    service = get_service()

    print("\nChecking if app exists in Play Console...")
    if not check_app_exists(service):
        print("\nERROR: App 'com.petroll.app' not found in Play Console.")
        print("Please create the app first at: https://play.google.com/console")
        print("\nSteps:")
        print("  1. Go to Play Console > All apps > Create app")
        print("  2. App name: PET Roll")
        print("  3. Default language: English (US)")
        print("  4. App or game: App")
        print("  5. Free or paid: Free")
        print("  6. Accept declarations")
        print("\nThen run this script again.")
        sys.exit(1)

    print("  App found! Proceeding with upload...")

    version_code = upload_aab(service)

    print("\n" + "=" * 55)
    print("  SUCCESS! App uploaded to Google Play!")
    print("=" * 55)
    print(f"\n  Package: {PACKAGE_NAME}")
    print(f"  Version Code: {version_code}")
    print(f"  Track: Internal Testing")
    print(f"\n  Play Console: https://play.google.com/console")
    print(f"  Direct link: https://play.google.com/console/developers/app/{PACKAGE_NAME}")
    print(f"\n  Next: Complete store listing and submit for review")

if __name__ == '__main__':
    main()
