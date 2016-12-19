/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var datasource = database.getDatasource();
var templates_itemsDaoExtensionsUtils = require('zeus/templates/templates_itemsDaoExtensionUtils');

// Create an entity
exports.create = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'INSERT INTO ZEUS_TEMPLATES_ITEMS (TMPLI_ID,TMPLI_TMPL_ID,TMPLI_NAME,TMPLI_IMAGE_NAME,TMPLI_IMAGE_VERSION,TMPLI_ENV,TMPLI_SCALE_MIN,TMPLI_SCALE_MAX,TMPLI_EXPOSE_INTERNAL,TMPLI_EXPOSE_EXTERNAL) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('ZEUS_TEMPLATES_ITEMS_TMPLI_ID').next();
        statement.setInt(++i, id);
        statement.setInt(++i, entity.tmpli_tmpl_id);
        statement.setString(++i, entity.tmpli_name);
        statement.setString(++i, entity.tmpli_image_name);
        statement.setString(++i, entity.tmpli_image_version);
        statement.setString(++i, entity.tmpli_env);
        statement.setInt(++i, entity.tmpli_scale_min);
        statement.setInt(++i, entity.tmpli_scale_max);
        statement.setString(++i, entity.tmpli_expose_internal);
        statement.setString(++i, entity.tmpli_expose_external);
		templates_itemsDaoExtensionsUtils.beforeCreate(connection, entity);
        statement.executeUpdate();
        templates_itemsDaoExtensionsUtils.afterCreate(connection, entity);
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
        var sql = 'SELECT * FROM ZEUS_TEMPLATES_ITEMS WHERE TMPLI_ID = ?';
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
exports.list = function(limit, offset, sort, desc, tmpli_tmpl_id) {
    var result = [];
    
    if (tmpli_tmpl_id === null) {
    	return result;
	}
	
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT ';
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += ' * FROM ZEUS_TEMPLATES_ITEMS';

        sql += ' WHERE TMPLI_TMPL_ID = ' + tmpli_tmpl_id;
        
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
        var sql = 'UPDATE ZEUS_TEMPLATES_ITEMS SET TMPLI_TMPL_ID = ?,TMPLI_NAME = ?,TMPLI_IMAGE_NAME = ?,TMPLI_IMAGE_VERSION = ?,TMPLI_ENV = ?,TMPLI_SCALE_MIN = ?,TMPLI_SCALE_MAX = ?,TMPLI_EXPOSE_INTERNAL = ?,TMPLI_EXPOSE_EXTERNAL = ? WHERE TMPLI_ID = ?';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setInt(++i, entity.tmpli_tmpl_id);
        statement.setString(++i, entity.tmpli_name);
        statement.setString(++i, entity.tmpli_image_name);
        statement.setString(++i, entity.tmpli_image_version);
        statement.setString(++i, entity.tmpli_env);
        statement.setInt(++i, entity.tmpli_scale_min);
        statement.setInt(++i, entity.tmpli_scale_max);
        statement.setString(++i, entity.tmpli_expose_internal);
        statement.setString(++i, entity.tmpli_expose_external);
        var id = entity.tmpli_id;
        statement.setInt(++i, id);
		templates_itemsDaoExtensionsUtils.beforeUpdate(connection, entity);
        statement.executeUpdate();
        templates_itemsDaoExtensionsUtils.afterUpdate(connection, entity);
    } finally {
        connection.close();
    }
};

// Delete an entity
exports.delete = function(entity) {
    var connection = datasource.getConnection();
    try {
    	var sql = 'DELETE FROM ZEUS_TEMPLATES_ITEMS WHERE TMPLI_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setString(1, entity.tmpli_id);
        templates_itemsDaoExtensionsUtils.beforeDelete(connection, entity);
        statement.executeUpdate();
        templates_itemsDaoExtensionsUtils.afterDelete(connection, entity);
    } finally {
        connection.close();
    }
};

// Return the entities count
exports.count = function(tmpli_tmpl_id) {

	if (tmpli_tmpl_id === null) {
    	return 0;
	}
	
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM ZEUS_TEMPLATES_ITEMS';
    	
    	sql += ' WHERE TMPLI_TMPL_ID = ' + tmpli_tmpl_id;
    	
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
		name: 'zeus_templates_items',
		type: 'object',
		properties: [
		{
			name: 'tmpli_id',
			type: 'integer',
			key: 'true',
			required: 'true'
		},
		{
			name: 'tmpli_tmpl_id',
			type: 'integer'
		},
		{
			name: 'tmpli_name',
			type: 'string'
		},
		{
			name: 'tmpli_image_name',
			type: 'string'
		},
		{
			name: 'tmpli_image_version',
			type: 'string'
		},
		{
			name: 'tmpli_env',
			type: 'string'
		},
		{
			name: 'tmpli_scale_min',
			type: 'integer'
		},
		{
			name: 'tmpli_scale_max',
			type: 'integer'
		},
		{
			name: 'tmpli_expose_internal',
			type: 'string'
		},
		{
			name: 'tmpli_expose_external',
			type: 'string'
		},
		]
	};
	return metadata;
};

// Create an entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.tmpli_id = resultSet.getInt('TMPLI_ID');
	result.tmpli_tmpl_id = resultSet.getInt('TMPLI_TMPL_ID');
    result.tmpli_name = resultSet.getString('TMPLI_NAME');
    result.tmpli_image_name = resultSet.getString('TMPLI_IMAGE_NAME');
    result.tmpli_image_version = resultSet.getString('TMPLI_IMAGE_VERSION');
    result.tmpli_env = resultSet.getString('TMPLI_ENV');
	result.tmpli_scale_min = resultSet.getInt('TMPLI_SCALE_MIN');
	result.tmpli_scale_max = resultSet.getInt('TMPLI_SCALE_MAX');
    result.tmpli_expose_internal = resultSet.getString('TMPLI_EXPOSE_INTERNAL');
    result.tmpli_expose_external = resultSet.getString('TMPLI_EXPOSE_EXTERNAL');
    return result;
}

