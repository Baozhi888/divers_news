#!/bin/bash

BACKUP_DIR="/backup/dest"
BACKUP_NAME="truck_$(date +%Y%m%d_%H%M%S).db"
MAX_BACKUPS=7

# Create backup
cp /backup/data/truck.db "$BACKUP_DIR/$BACKUP_NAME"

# Remove old backups
find "$BACKUP_DIR" -name "truck_*.db" -mtime +$MAX_BACKUPS -delete

# Check backup integrity
if sqlite3 "$BACKUP_DIR/$BACKUP_NAME" "PRAGMA integrity_check;" | grep -q "ok"; then
    echo "Backup successful and verified: $BACKUP_NAME"
else
    echo "Backup verification failed: $BACKUP_NAME"
    exit 1
fi
