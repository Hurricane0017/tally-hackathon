#include <cstdio> // For std::remove
#include <iostream> // For std::cerr and std::cout

int main() {
    const char* filename = "input.txt";

    if (std::remove(filename) == 0) {
        std::cout << "File deleted successfully.\n";
    } else {
        std::cerr << "Error deleting file.\n";
    }

    return 0;
}
