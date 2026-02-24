let mockUsers = [];
let idCounter = 1;

class QueryBuilder {
  constructor(data) {
    this.data = data;
    this._skip = 0;
    this._limit = null;
    this._sort = {};
    this._select = null;
  }

  skip(num) {
    this._skip = num;
    return this;
  }

  limit(num) {
    this._limit = num;
    return this;
  }

  sort(sortObj) {
    this._sort = sortObj;
    return this;
  }

  select(fields) {
    if (typeof fields === 'string') {
      this._select = fields.split(' ').filter(f => f);
    } else {
      this._select = fields;
    }
    return this;
  }

  async exec() {
    let result = [...this.data];

    if (Object.keys(this._sort).length > 0) {
      result.sort((a, b) => {
        for (let key in this._sort) {
          const order = this._sort[key];
          if (a[key] < b[key]) return order === -1 ? 1 : -1;
          if (a[key] > b[key]) return order === -1 ? -1 : 1;
        }
        return 0;
      });
    }

    if (this._skip) result = result.slice(this._skip);
    if (this._limit) result = result.slice(0, this._limit);

    if (this._select && this._select.length > 0) {
      result = result.map(item => {
        const projected = {};
        this._select.forEach(field => {
          if (field in item) {
            projected[field] = item[field];
          }
        });
        return projected;
      });
    }

    return result;
  }

  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected);
  }
}

class MockUser {
  constructor(data) {
    this._id = idCounter++;
    this.id = this._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.age = data.age;
    this.gender = data.gender;
    this.status = data.status || 'Active';
    this.address = data.address;
    this.profile = data.profile;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  save() {
    const index = mockUsers.findIndex(u => u._id === this._id);
    if (index !== -1) {
      mockUsers[index] = this;
    }
    return Promise.resolve(this);
  }

  static create(data) {
    const errors = {};
    
    if (!data.firstName) {
      errors.firstName = 'First name is required';
    } else if (data.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!data.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!data.email) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(data.email)) {
        errors.email = 'Please provide a valid email';
      }
      if (mockUsers.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        errors.email = 'Email already exists';
      }
    }
    
    if (!data.phone) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = 'Phone must be 10 digits';
    }
    
    if (data.age && data.age < 18) {
      errors.age = 'Age must be at least 18';
    }
    
    if (data.gender && !['Male', 'Female', 'Other'].includes(data.gender)) {
      errors.gender = 'Invalid gender selection';
    }
    
    if (data.status && !['Active', 'Inactive'].includes(data.status)) {
      errors.status = 'Invalid status selection';
    }
    
    if (Object.keys(errors).length > 0) {
      const error = new Error('Validation Error');
      error.name = 'ValidationError';
      error.statusCode = 400;
      error.errors = Object.entries(errors).reduce((acc, [key, msg]) => {
        acc[key] = { message: msg };
        return acc;
      }, {});
      return Promise.reject(error);
    }
    
    const user = new MockUser(data);
    mockUsers.push(user);
    return Promise.resolve(user);
  }

  static find(query = {}) {
    const filtered = mockUsers.filter(user => {
      for (let key in query) {
        if (user[key] !== query[key]) return false;
      }
      return true;
    });
    return new QueryBuilder(filtered);
  }

  static findById(id) {
    const user = mockUsers.find(u => u.id == id || u._id == id);
    return Promise.resolve(user || null);
  }

  static findByIdAndUpdate(id, update) {
    const userIndex = mockUsers.findIndex(u => u.id == id || u._id == id);
    if (userIndex === -1) return Promise.resolve(null);

    const user = mockUsers[userIndex];
    Object.assign(user, update, { updatedAt: new Date() });
    return Promise.resolve(user);
  }

  static findByIdAndDelete(id) {
    const userIndex = mockUsers.findIndex(u => u.id == id || u._id == id);
    if (userIndex === -1) return Promise.resolve(null);
    
    const user = mockUsers[userIndex];
    mockUsers.splice(userIndex, 1);
    return Promise.resolve(user);
  }

  static countDocuments(query = {}) {
    const count = mockUsers.filter(user => {
      for (let key in query) {
        if (user[key] !== query[key]) return false;
      }
      return true;
    }).length;
    return Promise.resolve(count);
  }

  static deleteMany(query = {}) {
    const initialLength = mockUsers.length;
    mockUsers = mockUsers.filter(user => {
      for (let key in query) {
        if (user[key] === query[key]) return false;
      }
      return true;
    });
    return Promise.resolve({ deletedCount: initialLength - mockUsers.length });
  }
}

export default MockUser;
