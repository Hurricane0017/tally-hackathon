#!/bin/bash

# Check if the code.cpp file exists
if [ ! -f "code.cpp" ]; then
  echo "Error: code.cpp file not found!" > verdict.txt
  exit 1
fi

# Read time limit from timelimit.txt
if [ -f "timelimit.txt" ]; then
  timelimit=$(cat timelimit.txt)
else
  echo "Error: timelimit.txt file not found!" > verdict.txt
  exit 1
fi

# Read memory limit from memorylimit.txt
if [ -f "memorylimit.txt" ]; then
  memorylimit=$(cat memorylimit.txt)
else
  echo "Error: memorylimit.txt file not found!" > verdict.txt
  exit 1
fi

# Compile the code.cpp file and redirect errors to verdict.txt
g++ -o code code.cpp 2> verdict.txt

# Check if the compilation was successful
if [ $? -eq 0 ]; then
  # Set the memory limit for the container
  # Since we cannot set the memory limit dynamically inside the container, we assume it is passed when the container is run

  # Run the compiled program with input redirected from input.txt, output to verdict.txt, and apply the time limit
  timeout "${timelimit}s" ./code < input.txt >> verdict.txt 2>&1
  if [ $? -eq 124 ]; then
    echo "Execution timed out." >> verdict.txt
  fi
else
  echo "Compilation failed." >> verdict.txt
  exit 1
fi
