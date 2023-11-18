const defaultValues = {
	cpp: {
		name: "main.cpp",
		language: "cpp",
		value: `// Online C++ compiler to run C++ program online
#include <iostream>

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
		value: `// Online Java Compiler
class Main {
	public static void main(String[] args) {
		System.out.println("Hello Java..!");
	}
}`,
	},
	go: {
		name: "main.go",
		language: "go",
		value: `// Online Go compiler to run Golang program online
package main
import "fmt"

func main() {
	fmt.Println("Hello Golang..!")
}`,
	},
	js: {
		name: "main.js",
		language: "js",
		value: `// Write, Edit and Run your Javascript code using JS Online Compiler
console.log("Hello Javascript..!");`,
	},
};

export default defaultValues;
