import knexLib from 'knex';

class ClientSql {
    constructor(config) {
        this.knex = knexLib(config);
    }

    async createTable() {
        return this.knex.schema.dropTableIfExists('articles')
        .finally(() => {
            return this.knex.schema.createTable('articles', table => {
                table.increments('id_article').primary();
                table.string('name', 50).notNullable();
                table.string('code', 10).notNullable();
                table.float('price');
                table.integer('stock');
            })
        })
    }    

    async insertArticle(articles) {
        return this.knex('articles').insert(articles);
    }

    async getArticles() {
        return this.knex('articles').select('*');
    }

    async getArticleById(id) {
        return this.knex('articles').where('id_article', id);
    }

    async updateArticle(id, newArticle) {
        return this.knex('articles').where('id_article', id).update(newArticle);
    }

    async deleteArticle(id) {
        return this.knex('articles').where('id_article', id).delete();
    }

    async updateArticleStock(id, newStockValue) {
        return this.knex('articles').where('id_article', id).update({ stock: newStockValue});
    }

    async close() {
        return this.knex.destroy();
    }

}

export default ClientSql;