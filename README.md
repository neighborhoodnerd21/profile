# NeighborhoodNerd21 Profile

[![Static Badge](https://img.shields.io/badge/boostrap-5.3.8-%236c757d?style=for-the-badge&logo=bootstrap&logoColor=%23ffffff&logoSize=auto&labelColor=%230d6efd)](https://getbootstrap.com/)
[![Static Badge](https://img.shields.io/badge/-NN21-%236c757d?style=for-the-badge&logo=githubpages&logoColor=%23ffffff&logoSize=auto&labelColor=%230d6efd)](https://neighborhoodnerd21.github.io/profile/)

This site is served with pages at:

[neighborhoodnerd21.github.io/profile/](https://neighborhoodnerd21.github.io/profile/)

I am also using this project to play with using Google ZX to standardize my
build process and to learn how to use GitHub Actions for CI/CD.

## Notes:

### vnu & css-validator executables

The executables for vnu.jar and css-validator.jar are created by running the following commands in the terminal:
Requires Java17+ to be installed and available in the PATH.

```bash
echo '#!/bin/bash' > myapp
echo 'exec java -jar "$0" "$@"' >> myapp
cat myapp.jar >> myapp
chmod +x myapp
```
