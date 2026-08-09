#!/bin/bash
git branch -m submit-pr-branch
git remote set-url origin https://github.com/dummy/repo.git # Prevent actual push but simulate failure if we need to.
