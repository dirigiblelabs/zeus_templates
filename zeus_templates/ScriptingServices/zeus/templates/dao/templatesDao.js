/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var datasource = database.getDatasource();
var templatesDaoExtensionsUtils = require('zeus/templates/utils/templatesDaoExtensionUtils');

// Create an entity
exports.create = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'INSERT INTO ZEUS_TEMPLATES (TMPL_ID,TMPL_NAME,TMPL_DATE,TMPL_AUTHOR,TMPL_DESCRIPTION) VALUES (?,?,?,?,?)';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('ZEUS_TEMPLATES_TMPL_ID').next();
        statement.setInt(++i, id);
        statement.setString(++i, entity.tmpl_name);
        if (entity.tmpl_date !== null) {
            var js_date_tmpl_date =  new Date(Date.parse(entity.tmpl_date));
            statement.setTimestamp(++i, js_date_tmpl_date);
        } else {
            statement.setTimestamp(++i, null);
        }
        statement.setString(++i, entity.tmpl_author);
        statement.setString(++i, entity.tmpl_description);
		templatesDaoExtensionsUtils.beforeCreate(connection, entity);
        statement.executeUpdate();
        templatesDaoExtensionsUtils.afterCreate(connection, entity);
    	return id;
    } finally {
        connection.close();
    }
};

// Return a single entity by Id
exports.get = function(id) {
	var entity = null;
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT * FROM ZEUS_TEMPLATES WHERE TMPL_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setInt(1, id);

        var resultSet = statement.executeQuery();
        if (resultSet.next()) {
            entity = createEntity(resultSet);
        }
    } finally {
        connection.close();
    }
    return entity;
};

// Return all entities
exports.list = function(limit, offset, sort, desc) {
    var result = [];
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT ';
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += ' * FROM ZEUS_TEMPLATES';
        if (sort !== null) {
            sql += ' ORDER BY ' + sort;
        }
        if (sort !== null && desc !== null) {
            sql += ' DESC ';
        }
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genLimitAndOffset(limit, offset);
        }
        var statement = connection.prepareStatement(sql);
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            result.push(createEntity(resultSet));
        }
    } finally {
        connection.close();
    }
    return result;
};

// Update an entity by Id
exports.update = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'UPDATE ZEUS_TEMPLATES SET TMPL_NAME = ?,TMPL_DATE = ?,TMPL_AUTHOR = ?,TMPL_DESCRIPTION = ? WHERE TMPL_ID = ?';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setString(++i, entity.tmpl_name);
        if (entity.tmpl_date !== null) {
            var js_date_tmpl_date =  new Date(Date.parse(entity.tmpl_date));
            statement.setTimestamp(++i, js_date_tmpl_date);
        } else {
            statement.setTimestamp(++i, null);
        }
        statement.setString(++i, entity.tmpl_author);
        statement.setString(++i, entity.tmpl_description);
        var id = entity.tmpl_id;
        statement.setInt(++i, id);
		templatesDaoExtensionsUtils.beforeUpdate(connection, entity);
        statement.executeUpdate();
        templatesDaoExtensionsUtils.afterUpdate(connection, entity);
    } finally {
        connection.close();
    }
};

// Delete an entity
exports.delete = function(entity) {
    var connection = datasource.getConnection();
    try {
    	var sql = 'DELETE FROM ZEUS_TEMPLATES WHERE TMPL_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setString(1, entity.tmpl_id);
        templatesDaoExtensionsUtils.beforeDelete(connection, entity);
        statement.executeUpdate();
        templatesDaoExtensionsUtils.afterDelete(connection, entity);
    } finally {
        connection.close();
    }
};

// Return the entities count
exports.count = function() {
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM ZEUS_TEMPLATES';
        var statement = connection.prepareStatement(sql);
        var rs = statement.executeQuery();
        if (rs.next()) {
            count = rs.getInt(1);
        }
    } finally {
        connection.close();
    }
    return count;
};

// Returns the metadata for the entity
exports.metadata = function() {
	var metadata = {
		name: 'zeus_templates',
		type: 'object',
		properties: [
		{
			name: 'tmpl_id',
			type: 'integer',
			key: 'true',
			required: 'true'
		},
		{
			name: 'tmpl_name',
			type: 'string'
		},
		{
			name: 'tmpl_date',
			type: 'timestamp'
		},
		{
			name: 'tmpl_author',
			type: 'string'
		},
		{
			name: 'tmpl_description',
			type: 'string'
		},
		]
	};
	return metadata;
};

// Create an entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.tmpl_id = resultSet.getInt('TMPL_ID');
    result.tmpl_name = resultSet.getString('TMPL_NAME');
    if (resultSet.getTimestamp('TMPL_DATE') !== null) {
        result.tmpl_date = new Date(resultSet.getTimestamp('TMPL_DATE').getTime());
    } else {
        result.tmpl_date = null;
    }
    result.tmpl_author = resultSet.getString('TMPL_AUTHOR');
    result.tmpl_description = resultSet.getString('TMPL_DESCRIPTION');
    return result;
}

