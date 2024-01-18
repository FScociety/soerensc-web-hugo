@echo off

echo Processing PNG files...
for %%I in (*.png) do (
    echo Processing: %%I
    ffmpeg -i "%%I" -qscale 90 "%%~nI.webp"
)

echo Processing JPG files...
for %%I in (*.jpg) do (
    echo Processing: %%I
    ffmpeg -i "%%I" -qscale 90 "%%~nI.webp"
)

echo Processing JPEG files...
for %%I in (*.jpeg) do (
    echo Processing: %%I
    ffmpeg -i "%%I" -qscale 90 "%%~nI.webp"
)

echo Conversion completed.
pause
