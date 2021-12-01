bucket_name=$1
aws_key=$2
aws_access_key=$3
aws_access_secret=$4
local_path=$5

# Remove any existing versions of a ZIP
rm -rf $local_path
echo $(ls)
# Create a zip of the current directory.
zip -r $local_path index.js config.json

# Install required dependencies for Python script.
pip3 install boto3==1.19.12

# Run upload script
python3 scripts/uploadFileToS3.py $bucket_name $aws_key $aws_access_key $aws_access_secret $local_path