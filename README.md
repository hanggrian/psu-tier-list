[![CircleCI](https://img.shields.io/circleci/build/gh/hanggrian/psu-tier-list)](https://app.circleci.com/pipelines/gh/hanggrian/psu-tier-list/)
[![Codecov](https://img.shields.io/codecov/c/gh/hanggrian/psu-tier-list)](https://app.codecov.io/gh/hanggrian/psu-tier-list/)

# PSU Tier List

Cultists' PSU Tier List in a simple React app.

## Building

Generate JSON file with a Python script:

```sh
python3 generate_products.py
```

Then, build the React app:

```sh
npm run build && npm run preview
```
