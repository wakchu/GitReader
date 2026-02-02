#!/bin/bash

# Configuration
APP_NAME="GitReader"
PROJECT_DIR="$(pwd)"
ICON_PATH="$PROJECT_DIR/gitreader-icon.png"
EXEC_PATH="$PROJECT_DIR/start_app.sh"
DESKTOP_FILE_PATH="$HOME/.local/share/applications/gitreader.desktop"

# Create .desktop file content
cat > "$DESKTOP_FILE_PATH" <<EOF
[Desktop Entry]
Version=1.0
Name=$APP_NAME
Comment=Stealth E-Reader mimicking GitHub
Exec=$EXEC_PATH
Icon=$ICON_PATH
Terminal=true
Type=Application
Categories=Utility;Education;
EOF

# Make executable
chmod +x "$DESKTOP_FILE_PATH"

echo "✅ Shortcut created at: $DESKTOP_FILE_PATH"
echo "You may need to press 'Allow Launching' if you see the icon on your desktop, or search for 'GitReader' in your applications menu."
