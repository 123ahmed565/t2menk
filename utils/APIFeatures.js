class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // DONE create Case Insensitive Indexes and find().collation()
  filter() {
    // 1) BASIC FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 2) ADVANCED FILTERING
    if (queryObj.name) {
      let nameValue = queryObj.name;
      queryObj.name = { $regex: `${nameValue}`, $options: "i" };
    }
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\bgt\b|\bgte\b|\blt|lte$\b/g,
      (match) => `$${match}`
    ); // Replacing the queryObj returned to match the mongo query by adding the '$ before operators
    this.query = this.query
      .find(JSON.parse(queryStr))
      .collation({ locale: "en", strength: 2 }); // implement case insensitive search
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("name");
    }
    return this;
  }

  project() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v -password");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10; // 10 results per page
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
