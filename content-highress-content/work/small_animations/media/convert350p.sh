# Create a subdirectory for the output files (optional but recommended)
mkdir output

# Iterate through all MP4 and MOV files in the current directory
for file in *.mp4 *.mov; do
  # Extract the filename without the extension
  filename="${file%.*}"

  # Run the ffmpeg command, saving the output in the 'output' directory
  ffmpeg -i "$file" -vf "scale=-2:360" -c:v libx264 -b:v 125k -maxrate 125k -bufsize 250k -an "output/$filename.mp4"
done
