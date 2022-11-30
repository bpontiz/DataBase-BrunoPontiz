import ClientSql from "./model/sql.js";
import { options } from "./config/mariaDB.js";

const sql = new ClientSql(options);

sql.createTable()
    .then(() => {
        console.log("Table created successfully!");
        const articles = [
            { name: "Science", code: "S1", price: 125.42, stock: 10},
            { name: "Math", code: "S2", price: 167.12, stock: 5},
            { name: "English" , code: "S3", price: 170, stock: 5},
            { name: "Tech" , code: "S4", price: 201.49, stock: 6},
            { name: "Programming" , code: "S5", price: 117.32, stock: 3}
        ];

        return sql.insertArticle(articles);
    })
    .then(() => {
        console.log("Article successfully inserted!");

        return sql.getArticles();
    })
    .then((articles) => {
        console.log(`Here are the articles:\n`);
        console.table(articles);
        return sql.deleteArticle(3);
    })
    .then(() => {
        console.log("Article successfully deleted!");
        return sql.updateArticleStock(5, 17);
    })
    .then(() => {
        console.log("Stock has been successfully updated!");
        return sql.getArticles();
    })
    .then((articles) => {
        console.log(`Here are the articles:\n`);
        console.table(articles);
    })
    .catch ((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        sql.close();
    })
