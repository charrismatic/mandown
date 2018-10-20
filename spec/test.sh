#!/bin/bash

TEST_NUM=${1:-"default"}

if [ "$TEST_NUM" = "default" ]; then

  # Via arguments.
  ./bin/mandown man

elif [[ $TEST_NUM = "pipe" ]]; then
  # Via pipe.
  cat ./spec/man.html | DEBUG_MANDOWN="yes" ./bin/mandown
fi

# # Via pipe from a file, better for larger strings.
# echo "pass in this string as input" > input.txt
# cat input.txt | ./example-script


ECODE=$?
if [ $ECODE -eq 0 ]
then
  echo "Test $TEST_NUM passed."
else
  echo "Test $TEST_NUM Failed with code $ECODE"
  echo "Could not create file" >&2
fi
