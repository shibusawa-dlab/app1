set -e
verion=$1
git tag $verion
git push origin $verion