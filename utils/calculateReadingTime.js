export const calculateReadingTim = async (content) => {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 200;

    // Count the number of words in the content
    const wordCount = content.trim().split(/\s+/g).length;

    // Calculate the reading time in minutes
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return readingTime;
};
