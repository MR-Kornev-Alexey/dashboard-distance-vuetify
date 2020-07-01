const cfg = require("./lib/config");
const { Pool } = require("pg");

const pool = new Pool(cfg.db);

async function getSortingDistance(data) {
  let res;
  const pageNumber = (data.pageNumber - 1) * data.distPerPage;
  try {
    if (data.isFilteringDistance) {
      if (
        data.isSortingCity &&
        !data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE distance ${data.compareData} ${data.searchData}
                                    ORDER BY city
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        !data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE distance ${data.compareData} ${data.searchData}
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE distance ${data.compareData} ${data.searchData}
                                    ORDER BY number
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        !data.isSortingNumber &&
        data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE distance ${data.compareData} ${data.searchData}
                                    ORDER BY distance
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      }
    } else {
      res = await pool.query(
        `SELECT *
                                    FROM distance 
                                    LIMIT $1 OFFSET $2;`,
        [data.distPerPage, pageNumber]
      );
    }

    let count = await pool.query(`SELECT COUNT(*) as count 
                                    FROM distance WHERE distance ${data.compareData} ${data.searchData}`);
    const outBufferData = [];
    for (var i = 0; i < res.rows.length; i++) {
      const a = {
        ig: res.rows[i].id,
        data: res.rows[i].data,
        city: res.rows[i].city,
        number: res.rows[i].number,
        distance: res.rows[i].distance
      };
      outBufferData.push(a);
    }
    return {
      distances: outBufferData,
      count: count.rows[0].count
    };
  } catch (e) {
    return [];
  }
}
async function getSortingNumber(data) {
  let res;
  const pageNumber = (data.pageNumber - 1) * data.distPerPage;
  try {
    if (data.isFilteringNumber) {
      if (
        data.isSortingCity &&
        !data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE number ${data.compareData} ${data.searchData}
                                    ORDER BY city
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        !data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE number ${data.compareData} ${data.searchData}
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE number ${data.compareData} ${data.searchData}
                                    ORDER BY number
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        !data.isSortingNumber &&
        data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE number ${data.compareData} ${data.searchData}
                                    ORDER BY distance
                                    LIMIT $1 OFFSET $2;`,
          [data.distPerPage, pageNumber]
        );
      }
    } else {
      res = await pool.query(
        `SELECT * FROM distance LIMIT $1 OFFSET $2;`,
        [data.distPerPage, pageNumber]
      );
    }

    let count = await pool.query(`SELECT COUNT(*) as count 
                                    FROM distance WHERE number ${data.compareData} ${data.searchData}`);
    const outBufferData = [];
    for (var i = 0; i < res.rows.length; i++) {
      const a = {
        ig: res.rows[i].id,
        data: res.rows[i].data,
        city: res.rows[i].city,
        number: res.rows[i].number,
        distance: res.rows[i].distance
      };
      outBufferData.push(a);
    }
    return {
      distances: outBufferData,
      count: count.rows[0].count
    };
  } catch (e) {
    return [];
  }
}

async function getSortingCity(data) {
  let res;
  const pageNumber = (data.pageNumber - 1) * data.distPerPage;
  // console.log(data)
  try {
    if (data.isFilteringCity) {
      if (
        data.isSortingCity &&
        !data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *FROM distance WHERE city ILIKE $1
                   ORDER BY city LIMIT $2 OFFSET $3;`,
          ["%" + data.searchData.trim() + "%", data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        !data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE city ILIKE $1
                                    LIMIT $2 OFFSET $3;`,
          ["%" + data.searchData.trim() + "%", data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        data.isSortingNumber &&
        !data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE city ILIKE $1
                                    ORDER BY number
                                    LIMIT $2 OFFSET $3;`,
          ["%" + data.searchData.trim() + "%", data.distPerPage, pageNumber]
        );
      } else if (
        !data.isSortingCity &&
        !data.isSortingNumber &&
        data.isSortingDistance
      ) {
        res = await pool.query(
          `SELECT *
                                    FROM distance WHERE city ILIKE $1
                                    ORDER BY distance
                                    LIMIT $2 OFFSET $3;`,
          ["%" + data.searchData.trim() + "%", data.distPerPage, pageNumber]
        );
      }
    } else {
      res = await pool.query(
        `SELECT *
                                    FROM distance
                                    ORDER BY city
                                    LIMIT $1 OFFSET $2;`,
        [data.distPerPage, pageNumber]
      );
    }

    let count = await pool.query(
      `SELECT COUNT(*) as count 
                                    FROM distance WHERE city ILIKE $1`,
      ["%" + data.searchData.trim() + "%"]
    );
    const outBufferData = [];
    for (var i = 0; i < res.rows.length; i++) {
      const a = {
        ig: res.rows[i].id,
        data: res.rows[i].data,
        city: res.rows[i].city,
        number: res.rows[i].number,
        distance: res.rows[i].distance
      };
      outBufferData.push(a);
    }
    return {
      distances: outBufferData,
      count: count.rows[0].count
    };
  } catch (e) {
    return [];
  }
}

async function getAllDist(limit, offset) {
  try {
    let res = await pool.query(
      `SELECT *
                                    FROM distance
                                    LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    let count = await pool.query(`SELECT COUNT(*) as count
                                    FROM distance `);
    const outBufferData = [];
    for (var i = 0; i < res.rows.length; i++) {
      const a = {
        ig: res.rows[i].id,
        data: res.rows[i].data,
        city: res.rows[i].city,
        number: res.rows[i].number,
        distance: res.rows[i].distance
      };
      outBufferData.push(a);
    }
    return {
      distances: outBufferData,
      count: count.rows[0].count
    };
  } catch (e) {
    return [];
  }
}

module.exports.getSortingDistance = getSortingDistance;
module.exports.getSortingNumber = getSortingNumber;
module.exports.getSortingCity = getSortingCity;
module.exports.getAllDist = getAllDist;
