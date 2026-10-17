import crypto from 'crypto';
import bcrypt from 'bcryptjs';

class MemoryCollection {
  constructor(name) {
    this.name = name;
    this.documents = [];
  }

  generateId() {
    return crypto.randomBytes(12).toString('hex');
  }

  matchesFilter(doc, filter) {
    if (!filter || Object.keys(filter).length === 0) return true;

    for (const key of Object.keys(filter)) {
      if (key === '$or') {
        const matchesAny = filter['$or'].some(subFilter => this.matchesFilter(doc, subFilter));
        if (!matchesAny) return false;
        continue;
      }

      const expected = filter[key];
      const actual = doc[key];

      if (expected && typeof expected === 'object' && !Array.isArray(expected) && !(expected instanceof RegExp)) {
        if (expected.$regex) {
          const regex = new RegExp(expected.$regex, expected.$options || 'i');
          if (!regex.test(String(actual || ''))) return false;
          continue;
        }
        if (expected.$in) {
          if (!expected.$in.includes(actual)) return false;
          continue;
        }
        if (expected.$gte !== undefined && Number(actual) < Number(expected.$gte)) return false;
        if (expected.$lte !== undefined && Number(actual) > Number(expected.$lte)) return false;
        if (expected.$ne !== undefined && actual === expected.$ne) return false;
      } else if (expected instanceof RegExp) {
        if (!expected.test(String(actual || ''))) return false;
      } else if (key === '_id' || key.endsWith('Id')) {
        if (String(actual) !== String(expected)) return false;
      } else {
        if (actual !== expected) return false;
      }
    }
    return true;
  }

  async find(filter = {}) {
    const matched = this.documents
      .filter(doc => this.matchesFilter(doc, filter))
      .map(doc => this.wrapDoc(doc));

    const queryObj = {
      _results: matched,
      sort(criteria) {
        const key = Object.keys(criteria)[0];
        const dir = criteria[key] === -1 ? -1 : 1;
        this._results.sort((a, b) => {
          if (a[key] > b[key]) return 1 * dir;
          if (a[key] < b[key]) return -1 * dir;
          return 0;
        });
        return this;
      },
      limit(n) {
        this._results = this._results.slice(0, n);
        return this;
      },
      select() {
        return this;
      },
      populate() {
        return this;
      },
      then(resolve, reject) {
        return Promise.resolve(this._results).then(resolve, reject);
      },
      catch(reject) {
        return Promise.resolve(this._results).catch(reject);
      }
    };

    return queryObj;
  }

  async findOne(filter = {}) {
    const found = this.documents.find(doc => this.matchesFilter(doc, filter));
    const result = found ? this.wrapDoc(found) : null;

    const queryObj = {
      _result: result,
      select(fields) {
        // if select('+password') or similar
        return this;
      },
      populate() {
        return this;
      },
      then(resolve, reject) {
        return Promise.resolve(this._result).then(resolve, reject);
      },
      catch(reject) {
        return Promise.resolve(this._result).catch(reject);
      }
    };

    return queryObj;
  }

  async findById(id) {
    return this.findOne({ _id: String(id) });
  }

  async create(data) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(item => this.create(item)));
    }

    const doc = { ...data };
    if (!doc._id) {
      doc._id = this.generateId();
    } else {
      doc._id = String(doc._id);
    }

    if (!doc.createdAt) doc.createdAt = new Date();
    if (!doc.updatedAt) doc.updatedAt = new Date();

    if (this.name === 'User' && doc.password && !doc.password.startsWith('$2a$') && !doc.password.startsWith('$2b$')) {
      doc.password = await bcrypt.hash(doc.password, 10);
    }

    this.documents.push(doc);
    return this.wrapDoc(doc);
  }

  async insertMany(docs) {
    const created = [];
    for (const d of docs) {
      const res = await this.create(d);
      created.push(res);
    }
    return created;
  }

  async findByIdAndUpdate(id, update, options = { new: true }) {
    const index = this.documents.findIndex(d => String(d._id) === String(id));
    if (index === -1) return null;

    const current = this.documents[index];
    const updated = { ...current, ...update, updatedAt: new Date() };

    if (this.name === 'User' && update.password && !update.password.startsWith('$2a$') && !update.password.startsWith('$2b$')) {
      updated.password = await bcrypt.hash(update.password, 10);
    }

    this.documents[index] = updated;
    return this.wrapDoc(updated);
  }

  async findOneAndUpdate(filter, update, options = { new: true }) {
    const index = this.documents.findIndex(d => this.matchesFilter(d, filter));
    if (index === -1) {
      if (options.upsert) {
        return this.create({ ...filter, ...update });
      }
      return null;
    }

    const current = this.documents[index];
    const updated = { ...current, ...update, updatedAt: new Date() };
    this.documents[index] = updated;
    return this.wrapDoc(updated);
  }

  async countDocuments(filter = {}) {
    return this.documents.filter(doc => this.matchesFilter(doc, filter)).length;
  }

  async deleteMany(filter = {}) {
    const initial = this.documents.length;
    this.documents = this.documents.filter(doc => !this.matchesFilter(doc, filter));
    return { deletedCount: initial - this.documents.length };
  }

  async deleteOne(filter = {}) {
    const index = this.documents.findIndex(doc => this.matchesFilter(doc, filter));
    if (index !== -1) {
      this.documents.splice(index, 1);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }

  async distinct(field) {
    const values = new Set();
    this.documents.forEach(d => {
      if (d[field]) values.add(d[field]);
    });
    return Array.from(values);
  }

  wrapDoc(rawDoc) {
    const collection = this;
    const wrapped = { ...rawDoc };

    wrapped.save = async function () {
      const idx = collection.documents.findIndex(d => String(d._id) === String(this._id));
      if (idx !== -1) {
        collection.documents[idx] = { ...this };
      } else {
        collection.documents.push({ ...this });
      }
      return wrapped;
    };

    wrapped.toObject = function () {
      const obj = { ...this };
      delete obj.save;
      delete obj.toObject;
      delete obj.toJSON;
      delete obj.matchPassword;
      return obj;
    };

    wrapped.toJSON = wrapped.toObject;

    if (collection.name === 'User') {
      wrapped.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
    }

    return wrapped;
  }
}

class InMemoryDatabase {
  constructor() {
    this.collections = {};
  }

  getCollection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new MemoryCollection(name);
    }
    return this.collections[name];
  }
}

export const inMemoryDb = new InMemoryDatabase();
