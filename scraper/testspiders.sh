#!/bin/bash

# Runs the tests that ends with _tests.py
for test_file in tests/*_tests.py; do
    # Extracts the file name
    file_name=$(basename -s .py "$test_file")
    
    echo "Running \"$file_name\""
    echo "----------------------------------------------------------------------"
    
    python -m unittest tests/$file_name.py
    
    echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
done