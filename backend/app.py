from flask import Flask, request, json, jsonify
from flask_cors import CORS
from config import host, port, user, password, db_name

from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

app.config["MYSQL_USER"] = user
app.config["MYSQL_PASSWORD"] = password
app.config["MYSQL_DB"] = db_name
app.config["MYSQL_HOST"] = host
app.config["MYSQL_PORT"] = port
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

mysql = MySQL(app)

@app.get('/')
def restApiRunning():
    return 'server is running'


@app.get('/api/employees')
def getEmployees():
    with mysql.connection.cursor() as cursor:
        sql = "SELECT masters.id, masters.name, professions.name AS profName FROM masters LEFT JOIN professions ON masters.ProfessionId=professions.id"
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.post('/api/employees')
def addEmployee():
    with mysql.connection.cursor() as cursor:
        data = request.get_json()
        sql = "INSERT INTO masters (name, ProfessionId) VALUES (%(employeeName)s, %(profID)s)"
        result = cursor.execute(sql, data)
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.delete('/api/employees')
def deleteEmployee():
    with mysql.connection.cursor() as cursor:
        empId = request.get_json()['empId']
        sql = "DELETE FROM masters WHERE id=%s"
        result = cursor.execute(sql, (empId,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.get('/api/services')
def getServices():
    with mysql.connection.cursor() as cursor:
        sql = "SELECT services.id, services.name, " \
              "professions.name AS profName, professions.id AS professionId " \
              "FROM services " \
              "LEFT JOIN professions " \
              "ON services.ProfessionId = professions.id"
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.post('/api/services')
def addService():
    with mysql.connection.cursor() as cursor:
        data = request.get_json()
        sql = "INSERT INTO services (name, ProfessionId) VALUES (%(serviceName)s, %(professionId)s)"
        result = cursor.execute(sql, data)
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.delete('/api/services')
def deleteService():
    with mysql.connection.cursor() as cursor:
        serviceId = request.get_json()['serviceId']
        sql = "DELETE FROM services WHERE id=%s"
        result = cursor.execute(sql, (serviceId,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.get('/api/servicecategories')
def getServiceCategories():
    with mysql.connection.cursor() as cursor:
        sql = "SELECT * FROM service_categories"
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.get('/api/professions')
def getProfessions():
    with mysql.connection.cursor() as cursor:
        sql = "SELECT id, name FROM professions"
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.post('/api/professions')
def addProfession():
    with mysql.connection.cursor() as cursor:
        name = request.get_json()['profName']
        sql = "INSERT INTO professions (name) VALUES (%s)"
        result = cursor.execute(sql, (name,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.delete('/api/professions')
def deleteProfession():
    with mysql.connection.cursor() as cursor:
        id = request.get_json()['profId']
        sql = "DELETE FROM professions WHERE id=%s"
        result = cursor.execute(sql, (id,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.get('/api/clients')
def getClients():
    with mysql.connection.cursor() as cursor:
        sql = "SELECT id, name FROM clients"
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.post('/api/clients')
def addClient():
    with mysql.connection.cursor() as cursor:
        name = request.get_json()['data']
        sql = "INSERT INTO clients(name) VALUES (%s)"
        result = cursor.execute(sql, (name,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.delete('/api/clients')
def deleteClient():
    with mysql.connection.cursor() as cursor:
        clientId = request.get_json()['id']
        sql = "DELETE FROM clients WHERE id = %s"
        result = cursor.execute(sql, (clientId,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.get('/api/booking')
def getBooking():
    args = request.args
    time_from = args.get("time_from")
    time_to = args.get("time_to")

    sql = "SELECT  shedules.id AS id, " \
                "shedules.timeFrom AS start , " \
                "shedules.timeTo AS 'end', " \
                "shedules.MasterId AS split, " \
                "clients.name AS title, " \
                "services.name AS content, " \
                "shedules.MasterId AS masterId, " \
                "clients.id AS clientId, " \
                "services.id AS serviceId " \
                "FROM workshedules AS shedules " \
                "LEFT JOIN clients ON shedules.ClientId = clients.id " \
                "LEFT JOIN services ON shedules.ServiceId = services.id"

    if None not in (time_from, time_to):
        sql += " WHERE shedules.timeFrom >= %(time_from)s AND shedules.timeTo <= %(time_to)s"

    with mysql.connection.cursor() as cursor:
        cursor.execute(sql, args)
        result = cursor.fetchall()

    return jsonify(result)


@app.put('/api/booking')
def putBooking():
    data = request.get_json()
    sql = "UPDATE workshedules " \
          "SET " \
          "timeFrom = %(timeFrom)s, " \
          "timeTo = %(timeTo)s, " \
          "MasterId = %(employeeId)s, " \
          "ClientId = %(clientId)s, " \
          "ServiceId = %(serviceId)s " \
          "WHERE id = %(eventId)s"

    with mysql.connection.cursor() as cursor:
        result = cursor.execute(sql, data)
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.delete('/api/booking/<booking_id>')
def deleteBooking(booking_id):
    sql = "DELETE FROM workshedules WHERE id = %s"

    with mysql.connection.cursor() as cursor:
        result = cursor.execute(sql, (booking_id,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.post('/api/booking')
def postBooking():
    data = request.get_json()['data']

    sql = "INSERT INTO workshedules (timeFrom, timeTo, MasterId, ClientId, ServiceId) " \
                "VALUES (%(timeFrom)s, %(timeTo)s, %(employeeId)s, %(clientId)s, %(serviceId)s)"

    with mysql.connection.cursor() as cursor:
        result = cursor.execute(sql, data)
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.get("/api/splits")
def getSplits():

    args = request.args
    selected_date = args.get("selected_date")

    sql = "SELECT timetable.timeFrom AS timeFrom, timetable.timeTo AS timeTo, " \
          "masters.id AS id, masters.name AS label, masters.ProfessionId AS professionId " \
          "FROM timetable " \
          "LEFT JOIN masters ON timetable.MasterId = masters.id " \
          "WHERE DATE(timetable.timeFrom)='{}'"
    sql = sql.format(selected_date)

    with mysql.connection.cursor() as cursor:
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.get('/api/employee/timetable')
def getTimetable():
    with mysql.connection.cursor() as cursor:
        sql = "SELECT timetable.id, timetable.timeFrom, timetable.timeTo, timetable.MasterId, masters.name AS MasterName, DATE(timetable.timeFrom) AS date FROM timetable AS timetable LEFT JOIN masters AS masters ON timetable.MasterId = masters.id"
        cursor.execute(sql)
        result = cursor.fetchall()

    return jsonify(result)


@app.post('/api/employee/timetable')
def postTimetable():
    with mysql.connection.cursor() as cursor:
        data = request.get_json()['data']
        sql = "INSERT INTO timetable (timeFrom, timeTo, MasterId) VALUES (%(timeFrom)s, %(timeTo)s, %(MasterId)s)"
        result = cursor.executemany(sql, data)
        mysql.connection.commit()

    return "Affected rows = " + str(result)


@app.delete('/api/employee/timetable')
def deleteTimetable():
    with mysql.connection.cursor() as cursor:
        listIds = request.get_json()
        sql = "DELETE FROM timetable WHERE id IN %s"
        result = cursor.execute(sql, (listIds,))
        mysql.connection.commit()

    return "Affected rows = " + str(result)


if __name__ == "__main__":
    app.run(port=3001, debug=True)