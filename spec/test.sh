#!/bin/bash

TEST_NUM=${1:-"default"}

SCRIPT_PATH="$(readlink -f -- $BASH_SOURCE)"
NODE_CWD="$(dirname -- $SCRIPT_PATH)"

if [ "$TEST_NUM" = "default" ]; then
   DEBUG_MANDOWN="yes" $NODE_CWD/../bin/mandown man
elif [ "$TEST_NUM" = "pipe" ]; then
  cat ./spec/test.html | DEBUG_MANDOWN="yes" $NODE_CWD/../bin/mandown
elif [ "$TEST_NUM" = "groff" ]; then
  zcat "$(man --where man)" | groff -p -t -me -T html | $NODE_CWD/../bin/mandown
fi

# RESULT
ECODE=$?

if [ $ECODE -eq 0 ]; then
  # PASS
  echo -e "Test: \033[4m\033[35m[$TEST_NUM]\033[0m \033[00;32mPASSED \033[0m \n"
else
  # FAIL
  echo -e "Test: \033[4m\033[35m [$TEST_NUM]\033[0m \033[01;31mFAILED \033[0mwith code \033[01;43;37m$ECODE\033[0m"
fi
