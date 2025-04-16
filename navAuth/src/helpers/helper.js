const db = require("./../models");
class HelperData {
  constructor(request) {
    this._request = request;
  }
  getClientIdByName(billboard_data, created_by) {
    return new Promise((resolve, reject) => {
      db.clients
        .findOne({
          where: {
            client_name: billboard_data.client_name,
          },
          attribute: ["id"],
        })
        .then((client) => {
          if (client) {
            let data = {
              billboard_id: billboard_data.billboard_id,
              user_id: billboard_data.user_id || 0,
              division: billboard_data.division,
              district: billboard_data.district,
              thana: billboard_data.thana,
              side: billboard_data.side,
              address: billboard_data.address,
              billboard_location: billboard_data.billboard_location,
              name_of_billboard: billboard_data.name_of_billboard,
              facing: billboard_data.facing,
              stand_start_date: billboard_data.stand_start_date,
              stand_end_date: billboard_data.stand_end_date,
              billboard_height: billboard_data.billboard_height,
              billboard_width: billboard_data.billboard_width,
              billboard_size: billboard_data.billboard_size,
              client_id: client.id,
              client_name: billboard_data.client_name,
              createdBy: created_by || null,
              updatedBy: created_by || null,
              createdAt: new Date() || null,
              updatedAt: new Date() || null,
            };
            resolve(data);
          } else {
            reject("Client not found");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getBillboardImageById(billboard) {
    //if(billboard.lat !== '' && billboard.lat !== null && billboard.lng !== '' && billboard.lng !== null ){
    return new Promise((resolve, reject) => {
      db.resources
        .all({
          where: {
            billboard_id: billboard.billboard_id.toString(),
          },
          attribute: ["res_path"],
        })
        .then((path) => {
          if (path) {
            let data = {
              id: billboard.id,
              billboard_id: billboard.billboard_id,
              user_id: billboard.user_id,
              display_name: billboard.display_name,
              billboard_location: billboard.billboard_location,
              division: billboard.division,
              district: billboard.district,
              thana: billboard.thana,
              address: billboard.address,
              name_of_billboard: billboard.name_of_billboard,
              side: billboard.side,
              facing: billboard.facing,
              stand_start_date: billboard.stand_start_date,
              stand_end_date: billboard.stand_end_date,
              billboard_height: billboard.billboard_height,
              billboard_width: billboard.billboard_width,
              billboard_size: billboard.billboard_size,
              client_id: billboard.client_id,
              client_name: billboard.client_name,
              lat: billboard.lat,
              lng: billboard.lng,
              is_active: billboard.is_active,
              image_path: path,
            };
            resolve(data);
          } else {
            let data = {
              id: billboard.id,
              billboard_id: billboard.billboard_id,
              user_id: billboard.user_id,
              display_name: billboard.display_name,
              billboard_location: billboard.billboard_location,
              division: billboard.division,
              district: billboard.district,
              thana: billboard.thana,
              address: billboard.address,
              name_of_billboard: billboard.name_of_billboard,
              side: billboard.side,
              facing: billboard.facing,
              stand_start_date: billboard.stand_start_date,
              stand_end_date: billboard.stand_end_date,
              billboard_height: billboard.billboard_height,
              billboard_width: billboard.billboard_width,
              billboard_size: billboard.billboard_size,
              client_id: billboard.client_id,
              client_name: billboard.client_name,
              lat: billboard.lat,
              lng: billboard.lng,
              is_active: billboard.is_active,
              image_path: [],
            };
            resolve(data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
    /*} else {
            let data = {
                id:billboard.id,
                billboard_id:billboard.billboard_id,
                user_id:billboard.user_id,
                display_name:billboard.display_name,
                billboard_location:billboard.billboard_location,
                division:billboard.division,
                district:billboard.district,
                thana:billboard.thana,
                address:billboard.address,
                name_of_billboard:billboard.name_of_billboard,
                side:billboard.side,
                facing:billboard.facing,
                stand_start_date:billboard.stand_start_date,
                stand_end_date:billboard.stand_end_date,
                billboard_height:billboard.billboard_height,
                billboard_width:billboard.billboard_width,
                billboard_size:billboard.billboard_size,
                client_id:billboard.client_id,
                client_name:billboard.client_name,
                lat:billboard.lat,
                lng:billboard.lng,
                is_active:billboard.is_active,
                image_path: []
            };
            return data;
        }*/
  }
  getBillboardDataWithImage(billboard) {
    return Promise.all(
      billboard.map((item) => {
        return this.getBillboardImageById(item);
      })
    ).then((res) => {
      return res;
    });
  }
  getBillboardData(billboard, created_by) {
    return Promise.all(
      billboard.map((item) => {
        return this.getClientIdByName(item, created_by);
      })
    ).then((res) => {
      return res;
    });

    /*return new Promise((resolve, reject) => {
            let data = [];
            let i = 0;
            for (i = 0; i< billboard.length; i++){
                this.getClientIdByName(billboard[i], created_by).then((res) => {
                    if (!res) {
                        response.json({success: false, message: 'Session token required or expired'})
                    } else {
                        data.push(res)
                    }
                }).catch((err) => {
                    reject('Invalid data supplied 2')
                })
            }
            console.log(data + 'asdas')
            console.log(data.length)
            if(data.length > 0){
                console.log(data)
                resolve(data);
            } else {
                console.log(data + 'asdasasdsadsa')
                reject('Invalid data supplied 1');
            }
        }).catch((err) => {
            reject(err)
        })*/
  }
  checkPermission(user, permission) {
    return new Promise((resolve, reject) => {
      const menu_sql = `select auth.users.id as user_id from auth.role_permissions
inner join auth.permissions on auth.permissions.id = auth.role_permissions.permission
inner join auth.users on auth.users.role = auth.role_permissions.role
where auth.permissions.action_permission = ? and auth.users.id = ? `;
      db.sequelize
        .query(menu_sql, {
          replacements: [permission, user],
          type: db.sequelize.QueryTypes.SELECT,
        })
        .then((permission) => {
          if (permission) {
            let user = "";
            permission.forEach((item, index) => {
              user = item.user_id;
            });
            resolve(user);
          } else {
            reject("No permission");
          }
        })
        .catch((err) => {
          reject(err);
        });

      /*db.clients.findOne({
                where: {
                    client_name: billboard_data.client_name
                },
                attribute: ['id']
            }).then((client) => {
                if (client){
                    resolve(client);
                }
                else {
                    reject('Client not found');
                }
            }).catch((err) => {
                reject(err)
            })*/
    });
  }
}

module.exports = HelperData;
