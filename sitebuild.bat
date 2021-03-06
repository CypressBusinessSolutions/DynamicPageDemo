@echo off

rem Ensure this Node.js and npm are first in the PATH
set PATH=%APPDATA%\npm;%~dp0;%PATH%

setlocal enabledelayedexpansion
pushd "%~dp0"

rem Figure out the node version.
set print_version=node.exe -p -e "process.versions.node + ' (' + process.arch + ')'"
for /F "usebackq delims=" %%v in (`%print_version%`) do set version=%%v

rem Print message.
if exist npm.cmd (
  echo Your environment has been set up for using Node.js !version! and npm.
) else (
  echo Your environment has been set up for using Node.js !version!.
)
popd
endlocal

Echo Build LESS to CSS
lessc ./src/app.less ./public/css/app.css


bower cache clean && bower install

pause

