// Determine the total number of repetitions of words in a paragraph.

// paragraph = "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process. It is, by far, the most important source of energy for life on Earth."

// countRepeated(paragraph) => 11

// "the" is seen 5 times (i.e. 4 repetitions)
// "is"  is seen 3 times (i.e. 2 repetitions)
// "of"  is seen 3 times (i.e. 2 repetitions)
// "it"  is seen 2 times (i.e. 1 repetition)
// "a"   is seen 3 times (i.e. 2 repetitions)

// hence number of repetitions is 4+2+2+1+2 = 11

export const countRepeated = (paragraph: string): number => {
  const map: Map<String, number> = new Map<String, number>();

  paragraph
    .split(/[\W_]/g) // O(n) n == str.lenght
    .forEach((word: string) => {
      if (!word) return;

      const w = word.toLocaleLowerCase(); // O(n) n == w.length
      map.set(w, (map.get(w) ?? -1) + 1); // O(1)
    });

  let count = 0;
  map.forEach((value: number) => {
    // O(n) = n == map.keys.length
    count += value;
  });

  return count;
};
