@echo off
for %%G in (*.gif) do (
    echo Processing: %%G
    ffmpeg -i "%%G" -c:v libvpx -crf 5 -b:v 2M -pix_fmt yuv420p "%%~nG.webm"
)
echo Conversion completed.
pause
