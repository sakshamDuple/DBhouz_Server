import { AppConfig } from "./config";
import { IAdmin, IBrand, IColor, IUnit } from "./interfaces";
import * as mongoDB from "mongodb";
import { LOG } from "./logger";
import { BrandService } from "./services/brand.service";
import { UnitService } from "./services/unit.service";
import { ColorService } from "./services/color.service";
import { AdminService } from "./services/admin.service";
import { AuthUtils } from "./auth.utils";

export async function dbInit(db: mongoDB.Db) {
  await db.dropDatabase();
  await db.createCollection(AppConfig.mongoCollections.admins).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.clients).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.merchants).catch((e) => console.log(e));
  await db
    .createCollection(AppConfig.mongoCollections.categories)
    .catch((e) => console.log(e));
  await db
    .createCollection(AppConfig.mongoCollections.subCategories)
    .catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.products).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.brands).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.documents).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.colors).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.units).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.user).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.orders).catch((e) => console.log(e));
  await db.createCollection(AppConfig.mongoCollections.contact).catch((e) => console.log(e));
  // await db.createCollection(AppConfig.mongoCollections.mainPage).catch((e) => console.log(e));
  // await db.createCollection(AppConfig.mongoCollections.banner).catch((e) => console.log(e));
}
export async function dataInit(db) {
  let newAdmin: IAdmin = {
    _id: null,
    name: "Admin",
    email: "admin@gmail.com",
    secret: await AuthUtils.generateHashPassword("123456"),
    createdAt: 0,
  };
  await AdminService.create(newAdmin);

  const newBrands = ["Adidas", "Puma", "Nike", "Armani Exchange", "Peter England", "Other"];
  for (let brand of newBrands) {
    let newBrand: IBrand = {
      _id: undefined,
      name: brand,
      priority: 1,
      createdAt: Date.now(),
    };
    try {
      await BrandService.create(newBrand);
      LOG.info(`Brand ${newBrand.name} created`);
    } catch (e) {
      console.error(e);
      LOG.error(e);
    }
  }

  const newUnits = ["mm", "cm", "Inch", "m", "Feet"];
  for (let unit of newUnits) {
    let newUnit: IUnit = {
      _id: undefined,
      name: unit,
      priority: 1,
      createdAt: Date.now(),
    };
    try {
      await UnitService.create(newUnit);
      LOG.info(`Unit ${newUnit.name} created`);
    } catch (e) {
      console.error(e);
      LOG.error(e);
    }
  }

  const newColors = ["maroon", "dark red", "brown", "firebrick", "crimson", "red", "tomato", "coral", "indian red", "light coral", "dark salmon", "salmon", "light salmon", "orange red", 'dark orange', "orange", "gold", "dark golden rod", "golden rod", "pale golden rod", "dark khaki", "khaki", "olive", "yellow", "yellow green", "dark olive green", "olive drab", "lawn green", "chartreuse", "green yellow", "dark green", "green", "forest green", "lime", "lime green", 'light green', 'pale green', "dark sea green", "medium spring green", "spring green", "sea green", "medium aqua marine", "medium sea green", "light sea green", "dark slate gray", "teal", "dark cyan", "aqua", "cyan", "light cyan", "dark turquoise", "turquoise", "medium turquoise", "pale turquoise", "aqua marine", "powder blue", "cadet blue", "steel blue", "corn flower blue", "deep sky blue", "dodger blue", "light blue", "sky blue", "light sky blue", "midnight blue", "navy", "dark blue", "medium blue", "blue", "royal blue", "blue violet", "indigo", "dark slate blue", "slate blue", "medium slate blue", "medium purple", "dark magenta", 'dark violet', "dark orchid", "medium orchid", 'purple', "thistle", 'plum', 'violet', 'magenta / fuchsia', "orchid", "medium violet red", "pale violet red", "deep pink", 'hot pink', "light pink", "pink", "antique white", "beige", "bisque", 'blanched almond', "wheat", "corn silk", "lemon chiffon", "light golden rod yellow", "light yellow", "saddle brown", "sienna", "chocolate", "peru", 'sandy brown', "burly wood", "tan", "rosy brown", "moccasin", "navajo white", "peach puff", "misty rose", "lavender blush", "linen", "old lace", "papaya whip", "sea shell", "mint cream", "slate gray", "light slate gray", "light steel blue", "lavender", "floral white", "alice blue", 'ghost white', "honeydew", 'ivory', "azure", "snow", 'black', 'dim gray', 'gray', "dark gray", "silver", "light gray", "gainsboro", "white smoke", "white"];
  const newHexValues = ["#800000", "#8B0000", "#A52A2A", "#B22222", "#DC143C", "#FF0000", "#FF6347", "#FF7F50", "#CD5C5C", "#F08080", "#E9967A", "#FA8072", "#FFA07A", "#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#B8860B", "#DAA520", "#EEE8AA", "#BDB76B", "#F0E68C", "#808000", "#FFFF00", "#9ACD32", "#556B2F", "#6B8E23", "#7CFC00", "#7FFF00", "#ADFF2F", "#006400", "#008000", "#228B22", "#00FF00", "#32CD32", "#90EE90", "#98FB98", "#8FBC8F", "#00FA9A", "#00FF7F", "#2E8B57", "#66CDAA", "#3CB371", "#20B2AA", "#2F4F4F", "#008080", "#008B8B", "#00FFFF", "#00FFFF", "#E0FFFF", "#00CED1", "#40E0D0", "#48D1CC", "#AFEEEE", "#7FFFD4", "#B0E0E6", "#5F9EA0", "#4682B4", "#6495ED", "#00BFFF", "#1E90FF", "#ADD8E6", "#87CEEB", "#87CEFA", "#191970", "#000080", "#00008B", "#0000CD", "#0000FF", "#4169E1", "#8A2BE2", "#4B0082", "#483D8B", "#6A5ACD", "#7B68EE", "#9370DB", "#8B008B", "#9400D3", "#9932CC", "#BA55D3", "#800080", "#D8BFD8", "#DDA0DD", "#EE82EE", "#FF00FF", "#DA70D6", "#C71585", "#DB7093", "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FAEBD7", "#F5F5DC", "#FFE4C4", "#FFEBCD", "#F5DEB3", "#FFF8DC", "#FFFACD", "#FAFAD2", "#FFFFE0", "#8B4513", "#A0522D", "#D2691E", "#CD853F", "#F4A460", "#DEB887", "#D2B48C", "#BC8F8F", "#FFE4B5", "#FFDEAD", "#FFDAB9", "#FFE4E1", "#FFF0F5", "#FAF0E6", "#FDF5E6", "#FFEFD5", "#FFF5EE", "#F5FFFA", "#708090", "#778899", "#B0C4DE", "#E6E6FA", "#FFFAF0", "#F0F8FF", "#F8F8FF", "#F0FFF0", "#FFFFF0", "#F0FFFF", "#FFFAFA", "#000000", "#696969", "#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#DCDCDC", "#F5F5F5", "#FFFFFF"];
  let index = 0;
  console.log("newColors", newColors.length)
  console.log("newHexValues", newHexValues.length)
  for (let color of newColors) {
    let newColor: IColor = {
      _id: undefined,
      name: color,
      hexValue: newHexValues[index],
      priority: index + 1,
      createdAt: Date.now(),
    };
    try {
      await ColorService.create(newColor);
      index++;
      LOG.info(`Color ${newColor.name} created`);
    } catch (e) {
      console.error(e);
      LOG.error(e);
    }
  }
}
