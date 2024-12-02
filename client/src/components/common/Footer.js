export const Footer = () => {
    const template = `
        <footer class="gradient-background text-white py-6 md:py-8">
            <div class="container mx-auto px-4">
                <div class="text-center">
                    <p class="text-sm md:text-base">© 2024 Urban Assistance and Infrastructure Development</p>
                    <div class="flex justify-center space-x-4 mt-4">
                        <a href="#" class="text-sm md:text-base hover:text-teal-200 transition duration-300">Twitter</a>
                        <a href="#" class="text-sm md:text-base hover:text-teal-200 transition duration-300">Instagram</a>
                        <a href="#" class="text-sm md:text-base hover:text-teal-200 transition duration-300">Facebook</a>
                        <a href="#" class="text-sm md:text-base hover:text-teal-200 transition duration-300">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    `;

    return template;
};