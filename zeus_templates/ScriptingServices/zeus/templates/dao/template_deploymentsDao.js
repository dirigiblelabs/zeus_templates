/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var datasource = database.getDatasource();

// Create an entity
exports.create = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'INSERT INTO ZEUS_TEMPLATE_DEPLOYMENTS (TMPLD_ID,TMPLD_TMPL_ID,TMPLD_NAME,TMPLD_NAMESPACE,TMPLD_APPLICATION,TMPLD_IMAGE,TMPLD_REPLICAS,TMPLD_PORT,TMPLD_PROTOCOL,TMPLD_ENV) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('ZEUS_TEMPLATE_DEPLOYMENTS_TMPLD_ID').next();
        statement.setInt(++i, id);
        statement.setInt(++i, entity.tmpld_tmpl_id);
        statement.setString(++i, entity.tmpld_name);
        statement.setString(++i, entity.tmpld_namespace);
        statement.setString(++i, entity.tmpld_application);
        statement.setString(++i, entity.tmpld_image);
        statement.setInt(++i, entity.tmpld_replicas);
        statement.setInt(++i, entity.tmpld_port);
        statement.setString(++i, entity.tmpld_protocol);
        statement.setString(++i, entity.tmpld_env);
        statement.executeUpdate();
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
        var sql = 'SELECT * FROM ZEUS_TEMPLATE_DEPLOYMENTS WHERE TMPLD_ID = ?';
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
exports.list = function(limit, offset, sort, desc, tmpld_tmpl_id) {
	if (tmpld_tmpl_id === null) {
		return [];
	}
    var result = [];
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT ';
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += ' * FROM ZEUS_TEMPLATE_DEPLOYMENTS';
        sql += ' WHERE TMPLD_TMPL_ID = ?';
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
        statement.setInt(1, tmpld_tmpl_id);
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
        var sql = 'UPDATE ZEUS_TEMPLATE_DEPLOYMENTS SET TMPLD_TMPL_ID = ?,TMPLD_NAME = ?,TMPLD_NAMESPACE = ?,TMPLD_APPLICATION = ?,TMPLD_IMAGE = ?,TMPLD_REPLICAS = ?,TMPLD_PORT = ?,TMPLD_PROTOCOL = ?,TMPLD_ENV = ? WHERE TMPLD_ID = ?';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setInt(++i, entity.tmpld_tmpl_id);
        statement.setString(++i, entity.tmpld_name);
        statement.setString(++i, entity.tmpld_namespace);
        statement.setString(++i, entity.tmpld_application);
        statement.setString(++i, entity.tmpld_image);
        statement.setInt(++i, entity.tmpld_replicas);
        statement.setInt(++i, entity.tmpld_port);
        statement.setString(++i, entity.tmpld_protocol);
        statement.setString(++i, entity.tmpld_env);
        var id = entity.tmpld_id;
        statement.setInt(++i, id);
        statement.executeUpdate();
    } finally {
        connection.close();
    }
};

// Delete an entity
exports.delete = function(entity) {
    var connection = datasource.getConnection();
    try {
    	var sql = 'DELETE FROM ZEUS_TEMPLATE_DEPLOYMENTS WHERE TMPLD_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setString(1, entity.tmpld_id);
        statement.executeUpdate();
    } finally {
        connection.close();
    }
};

// Return the entities count
exports.count = function(tmpld_tmpl_id) {
	if (tmpld_tmpl_id === null) {
		return 0;
	}
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM ZEUS_TEMPLATE_DEPLOYMENTS';
    	sql += ' WHERE TMPLD_TMPL_ID = ?';
        var statement = connection.prepareStatement(sql);
    	statement.setInt(1, tmpld_tmpl_id);
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
		name: 'zeus_template_deployments',
		type: 'object',
		properties: [
		{
			name: 'tmpld_id',
			type: 'integer',
			key: 'true',
			required: 'true'
		},
		{
			name: 'tmpld_tmpl_id',
			type: 'integer'
		},
		{
			name: 'tmpld_name',
			type: 'string'
		},
		{
			name: 'tmpld_namespace',
			type: 'string'
		},
		{
			name: 'tmpld_application',
			type: 'string'
		},
		{
			name: 'tmpld_image',
			type: 'string'
		},
		{
			name: 'tmpld_replicas',
			type: 'integer'
		},
		{
			name: 'tmpld_port',
			type: 'integer'
		},
		{
			name: 'tmpld_protocol',
			type: 'string'
		},
		{
			name: 'tmpld_env',
			type: 'string'
		},
		]
	};
	return metadata;
};

// Create an entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.tmpld_id = resultSet.getInt('TMPLD_ID');
	result.tmpld_tmpl_id = resultSet.getInt('TMPLD_TMPL_ID');
    result.tmpld_name = resultSet.getString('TMPLD_NAME');
    result.tmpld_namespace = resultSet.getString('TMPLD_NAMESPACE');
    result.tmpld_application = resultSet.getString('TMPLD_APPLICATION');
    result.tmpld_image = resultSet.getString('TMPLD_IMAGE');
	result.tmpld_replicas = resultSet.getInt('TMPLD_REPLICAS');
	result.tmpld_port = resultSet.getInt('TMPLD_PORT');
    result.tmpld_protocol = resultSet.getString('TMPLD_PROTOCOL');
    result.tmpld_env = resultSet.getString('TMPLD_ENV');
    return result;
}

