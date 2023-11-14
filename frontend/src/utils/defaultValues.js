const defaultValues = {
	cpp: {
		name: "main.cpp",
		language: "cpp",
		value: `#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Hello C++..!";

    return 0;
}`,
	},
	py: {
		name: "main.py",
		language: "py",
		value: `# Write Python 3 code in this online editor and run it.
print("Hello Python..!")`,
	},
	java: {
		name: "Main.java",
		language: "java",
		value: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java..!");
    }
}`,
	},
	js: {
		name: "main.js",
		language: "js",
		value: `console.log("Hello Javascript..!");`,
	},
};

export default defaultValues;
