/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var datasource = database.getDatasource();

// Create an entity
exports.create = function(entity) {
    var connection = datasource.getConnection();
    try {
        var sql = 'INSERT INTO ZEUS_TEMPLATE_SERVICES (TMPLS_ID,TMPLS_TMPL_ID,TMPLS_NAME,TMPLS_NAMESPACE,TMPLS_APPLICATION,TMPLS_PORT,TMPLS_TARGET_PORT,TMPLS_PROTOCOL,TMPLS_TYPE) VALUES (?,?,?,?,?,?,?,?,?)';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('ZEUS_TEMPLATE_SERVICES_TMPLS_ID').next();
        statement.setInt(++i, id);
        statement.setInt(++i, entity.tmpls_tmpl_id);
        statement.setString(++i, entity.tmpls_name);
        statement.setString(++i, entity.tmpls_namespace);
        statement.setString(++i, entity.tmpls_application);
        statement.setInt(++i, entity.tmpls_port);
        statement.setInt(++i, entity.tmpls_target_port);
        statement.setString(++i, entity.tmpls_protocol);
        statement.setString(++i, entity.tmpls_type);
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
        var sql = 'SELECT * FROM ZEUS_TEMPLATE_SERVICES WHERE TMPLS_ID = ?';
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
exports.list = function(limit, offset, sort, desc, tmpls_tmpl_id) {
	if (tmpls_tmpl_id === null) {
		return [];
	}
    var result = [];
    var connection = datasource.getConnection();
    try {
        var sql = 'SELECT ';
        if (limit !== null && offset !== null) {
            sql += ' ' + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += ' * FROM ZEUS_TEMPLATE_SERVICES';
        sql += ' WHERE TMPLS_TMPL_ID = ?';
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
        statement.setInt(1, tmpls_tmpl_id);
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
        var sql = 'UPDATE ZEUS_TEMPLATE_SERVICES SET TMPLS_TMPL_ID = ?,TMPLS_NAME = ?,TMPLS_NAMESPACE = ?,TMPLS_APPLICATION = ?,TMPLS_PORT = ?,TMPLS_TARGET_PORT = ?,TMPLS_PROTOCOL = ?,TMPLS_TYPE = ? WHERE TMPLS_ID = ?';
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setInt(++i, entity.tmpls_tmpl_id);
        statement.setString(++i, entity.tmpls_name);
        statement.setString(++i, entity.tmpls_namespace);
        statement.setString(++i, entity.tmpls_application);
        statement.setInt(++i, entity.tmpls_port);
        statement.setInt(++i, entity.tmpls_target_port);
        statement.setString(++i, entity.tmpls_protocol);
        statement.setString(++i, entity.tmpls_type);
        var id = entity.tmpls_id;
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
    	var sql = 'DELETE FROM ZEUS_TEMPLATE_SERVICES WHERE TMPLS_ID = ?';
        var statement = connection.prepareStatement(sql);
        statement.setString(1, entity.tmpls_id);
        statement.executeUpdate();
    } finally {
        connection.close();
    }
};

// Return the entities count
exports.count = function(tmpls_tmpl_id) {
	if (tmpls_tmpl_id === null) {
		return 0;
	}
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM ZEUS_TEMPLATE_SERVICES';
    	sql += ' WHERE TMPLS_TMPL_ID = ?';
        var statement = connection.prepareStatement(sql);
    	statement.setInt(1, tmpls_tmpl_id);
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
		name: 'zeus_template_services',
		type: 'object',
		properties: [
		{
			name: 'tmpls_id',
			type: 'integer',
			key: 'true',
			required: 'true'
		},
		{
			name: 'tmpls_tmpl_id',
			type: 'integer'
		},
		{
			name: 'tmpls_name',
			type: 'string'
		},
		{
			name: 'tmpls_namespace',
			type: 'string'
		},
		{
			name: 'tmpls_application',
			type: 'string'
		},
		{
			name: 'tmpls_port',
			type: 'integer'
		},
		{
			name: 'tmpls_target_port',
			type: 'integer'
		},
		{
			name: 'tmpls_protocol',
			type: 'string'
		},
		{
			name: 'tmpls_type',
			type: 'string'
		},
		]
	};
	return metadata;
};

// Create an entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.tmpls_id = resultSet.getInt('TMPLS_ID');
	result.tmpls_tmpl_id = resultSet.getInt('TMPLS_TMPL_ID');
    result.tmpls_name = resultSet.getString('TMPLS_NAME');
    result.tmpls_namespace = resultSet.getString('TMPLS_NAMESPACE');
    result.tmpls_application = resultSet.getString('TMPLS_APPLICATION');
	result.tmpls_port = resultSet.getInt('TMPLS_PORT');
	result.tmpls_target_port = resultSet.getInt('TMPLS_TARGET_PORT');
    result.tmpls_protocol = resultSet.getString('TMPLS_PROTOCOL');
    result.tmpls_type = resultSet.getString('TMPLS_TYPE');
    return result;
}

