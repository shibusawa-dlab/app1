set -e
verion=v$(TZ=Asia/Tokyo date +%Y%m%d-%H%M%S)
git tag $verion
git push origin $verion
echo $verion