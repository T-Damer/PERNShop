const sequelize = require('../db.js')
const { DataTypes } = require('sequelize')

const string = DataTypes.STRING
const integer = DataTypes.INTEGER

const User = sequelize.define('user', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
  email: { type: string, unique: true },
  password: { type: string },
  role: { type: string, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
})

const BasketDevice = sequelize.define('basket_device', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
})

const Device = sequelize.define('device', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: string, unique: true, allowNull: false },
  price: { type: integer, allowNull: false },
  rating: { type: integer, defaultValue: 0 },
  img: { type: string, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
  title: { type: string, allowNull: false },
  description: { type: string, allowNull: false },
})

const Type = sequelize.define('type', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: string, unique: true },
})

const Brand = sequelize.define('brand', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: string, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: { type: integer, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
  id: {
    type: integer,
    primaryKey: true,
    autoIncrement: true,
  },
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
  User,
  Basket,
}
