const db = require("../database/connect");
class Diary {
    constructor({
        diary_id,
        title,
        content,
        is_secret,
        creation_date,
        update_date,
        user_id
    }) {
        this.id = diary_id;
        this.title = title;
        this.content = content;
        this.is_secret = is_secret;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.user_id = user_id;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM diary;"
        );
        if (response.rows.length == 0) throw new Error("No Diaries have been found");
        return response.rows.map((g) => new Diary(g));
    }

    static async getByRecent() {
        const response = await db.query(
            "SELECT * FROM diary ORDER BY update_date DESC LIMIT 1;"
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate snack.");
        return new Diary(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM diary WHERE diary_id = $1;",
            [id]
        );
        if (response.rows.length != 1)
            throw new Error("Unable to locate snack.");
        return new Diary(response.rows[0]);
    }

    static async create(data) {
        data.user_id = data.user_id || 1;
        // const d = new Date(year,month,day,hours,minutes,seconds)
        // const update_date = d.getFullYear;
        const response = await db.query(
            "INSERT INTO diary (title, content, is_secret, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
            [data.title, data.content, data.is_secret, data.user_id]
        );

        return response.rows.map((w) => new Diary(w));
    }

    async update(data) {
        const response = await db.query(
            "UPDATE diary SET title = $2, content = $3 WHERE diary_id = $1 RETURNING diary_id;",
            [this.id, data.title, data.content]
        );
        console.log(response.rows[0]);
        if (response.rows.length != 1)
            throw new Error("Unable to update votes.");
        return new Diary(response.rows[0]);
    }

    async destroy() {
        const response = await db.query(
            "DELETE FROM diary WHERE diary_id = $1 RETURNING *;",
            [this.id]
        );
        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;
