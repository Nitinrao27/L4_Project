#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Function to compute factorial
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

// Function to print array
void printArray(vector<int>& arr) {
    cout << "Array elements: ";
    for(int num : arr) {
        cout << num << " ";
    }
    cout << endl;
}

// Function to reverse string
string reverseString(string s) {
    string res = "";
    for(int i = s.size() - 1; i >= 0; i--) {
        res += s[i];
    }
    return res;
}

int main() {
    cout << "=== Welcome to the Compiler Test ===" << endl;
    
    // Sum of first 10 numbers
    int sum = 0;
    for(int i = 1; i <= 10; i++) {
        sum += i;
    }
    cout << "Sum of first 10 numbers: " << sum << endl;

    // Factorial
    int num = 5;
    cout << "Factorial of " << num << ": " << factorial(num) << endl;

    // Array print
    vector<int> myArray = {1, 2, 3, 4, 5, 6, 7};
    printArray(myArray);

    // Reverse string
    string original = "Hello Compiler!";
    cout << "Original string: " << original << endl;
    cout << "Reversed string: " << reverseString(original) << endl;

    // Multiplication table
    cout << "Multiplication Table of 7:" << endl;
    for(int i = 1; i <= 10; i++) {
        cout << "7 x " << i << " = " << 7 * i << endl;
    }

    cout << "=== End of Test ===" << endl;
    return 0;
}
