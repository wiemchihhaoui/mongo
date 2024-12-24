use("library");
// db.books.insertMany(
//     [
//         { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", year: 1967, available: true, genres: ["Fiction", "Magical Realism"] },
//         { title: "Chronicle of a Death Foretold", author: "Gabriel García Márquez", year: 1981, available: false, genres: ["Fiction", "Mystery"] },
//         { title: "Love in the Time of Cholera", author: "Gabriel García Márquez", year: 1985, available: true, genres: ["Fiction", "Romance"] },
//         { title: "IT", author: "Stephen King", year: 1986, available: true, genres: ["Fiction", "Horror"] },
//         { title: "The Shining", author: "Stephen King", year: 1977, available: false, genres: ["Fiction", "Horror"] },
//         { title: "Carrie", author: "Stephen King", year: 1974, available: true, genres: ["Fiction", "Horror"] },
//         { title: "Vertigo", author: "Ahmed Mourad", year: 2007, available: true, genres: ["Fiction", "Thriller"] },
//         { title: "The Blue Elephant", author: "Ahmed Mourad", year: 2012, available: true, genres: ["Fiction", "Psychological Thriller"] },
//         { title: "1919", author: "Ahmed Mourad", year: 2010, available: false, genres: ["Fiction", "Historical"] },
//         { title: "A Murder Is Announced", author: "Ahmed Mourad", year: 2018, available: true, genres: ["Fiction", "Mystery"] }
//     ]
// )

// Quering

// db.books.find(
//     {
//         author:"Ahmed Mourad"
//     }
// )

// db.books.find(
//     {
//         year: {
//             $gt: 1980
//         }
//     }
// )

// db.books.find(
//     {
//         available:true
//     }
// )

// db.books.countDocuments()
// db.books.findOne({
//     title: "The Shining"
// })

// Updating
// db.books.updateOne(
//   {
//     title: "Chronicle of a Death Foretold",
//   },
//   {
//     $set: {
//       available: true,
//     },
//   }
// );

// db.books.updateOne(
//   {
//     title: "Love in the Time of Cholera",
//   },
//   {
//     $push: {
//       genres: "Drama",
//     },
//   }
// );

// db.books.updateOne(
//   {
//     title: "Carrie",
//   },
//   {
//     $set: {
//       year: 1975,
//     },
//   }
// );

// db.books.updateMany(
//   {
//     year: {
//       $lt: 1980,
//     },
//   },
//   {
//     $inc: {
//       year: 1,
//     },
//   }
// );

// Deleting documents
// db.books.deleteOne(
//   {
//     title: "1919"
//   }
// )

// db.books.deleteMany({
//   available: false,
// });

// Advanced Queries
// db.books.find({
//   author: {
//     $in : ["Stephen King", "Gabriel García Márquez"]
//   }
// })

// db.books.find({
//   genres: {
//     $size: {
//       $gt: 1,
//     },
//   },
// });

// db.books.aggregate([
//   {
//     $addFields: {
//       countOfGenre: {
//         $size: "$genres",
//       },
//     },
//   },
//   {
//     $match: {
//       countOfGenre: {
//         $gt: 1,
//       },
//     },
//   },
//   {
//     $project: {
//       countOfGenre: 0,
//     },
//   },
// ]);

// db.books.find().sort({ year: -1 });
db.books.find().limit(5);

// Aggregation
// 1. Count Books by Author
// db.books.aggregate([
//   {
//     $group: {
//       _id: "$author",
//       booksNbr: {
//         $sum: 1,
//       },
//     },
//   },
// ]);

// 2. List All Genres

// db.books.aggregate(
//   [
//     {
//      $unwind: "$genres"
//     },
//     {
//       $group: {
//         _id: null,
//         genres: {
//           $addToSet: "$genres"
//         }
//       }
//     }
//   ]
// )

// 3. Books Published After 1980

// db.books.aggregate(
//   {
//     $match: {
//       year: {
//         $gt: 1980,
//       },
//     },
//   },
//   {
//     $project: {
//       title: 1,
//       author: 1,
//       year: 1,
//       _id: 0,
//     },
//   }
// );

// 4. Books by Genre
// db.books.aggregate([
//   {
//     $unwind: "$genres",
//   },
//   {
//     $group: {
//       _id: "$genres",
//       count: {
//         $sum: 1,
//       },
//     },
//   },
// ]);

// 5. Available Books by Author
// db.books.aggregate([
//   {
//     $match: {
//       available: true,
//     },
//   },
//   {
//     $group: {
//       _id: "$author",
//       count: {
//         $sum: 1,
//       },
//     },
//   },
// ]);

// 6. Oldest and Newest Book

// db.books.aggregate({
//   $facet: {
//     newBook: [
//       {
//         $sort: {
//           year: -1,
//         },
//       },
//       {
//         $limit: 1,
//       },
//     ],
//     oldBook: [
//       {
//         $sort: {
//           year: 1,
//         },
//       },
//       {
//         $limit: 1,
//       },
//     ]
//   },
// });

// 7. Sort Books by Year (Descending)

// db.books.aggregate([
//   {
//     $sort: {
//       year: -1,
//     },
//   },
// ]);

// 8. Most Popular Genre

db.books.aggregate([
  {
    $unwind: "$genres",
  },
  {
    $group: {
      _id: "$genres",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1,
  },
]); 