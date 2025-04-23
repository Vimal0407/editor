import subprocess
import os
import sys
import platform

# Helper to open terminal based on OS
def open_terminal(command, cwd=None):
    if platform.system() == "Windows":
        subprocess.Popen(
            ['start', 'cmd', '/k', command],
            shell=True,
            cwd=cwd
        )
    elif platform.system() == "Darwin":  # macOSE
        subprocess.Popen([
            'osascript', '-e',
            f'tell app "Terminal" to do script "cd {cwd or os.getcwd()} && {command}"'W
        ])
    elif platform.system() == "Linux":
        subprocess.Popen([
            'gnome-terminal', '--', 'bash', '-c',
            f'cd {cwd or os.getcwd()} && {command}; exec bash'
        ])
    else:
        print("Unsupported OS")
        sys.exit(1)

# Paths
frontend_dir = os.path.join(os.getcwd())
backend_dir = os.path.join(os.getcwd())  # assuming `main.py` is in the same root

# Commands
react_command = "npm start"
fastapi_command = "python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

# Run both in separate terminals
print("Launching FastAPI backend...")
open_terminal(fastapi_command, cwd=backend_dir)

print("Launching React frontend...")
open_terminal(react_command, cwd=frontend_dir)
