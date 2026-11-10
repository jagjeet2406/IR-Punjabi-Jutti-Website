// Run this ONE TIME to move your existing utilis.jsx data into MongoDB
// Command: node seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// ── PASTE YOUR Women_page array from utilis.jsx here ──
const Women_page = [
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679579/WhatsApp_Image_2026-07-10_at_3.55.57_PM_1_shpvjc.jpg", name:"Beige Heel Mule Jutti", price:"₹1", fake_price:"₹3199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679607/WhatsApp_Image_2026-07-10_at_3.55.28_PM_kyy8ag.jpg", name:"White Pearl Embroidered Jutti", price:"₹199", fake_price:"₹399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679607/WhatsApp_Image_2026-07-10_at_3.55.27_PM_e3fkps.jpg", name:"White Crochet Lace Jutti", price:"₹299", fake_price:"₹599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679606/WhatsApp_Image_2026-07-10_at_3.55.28_PM_1_pklr9r.jpg", name:"Black Floral Embroidered Jutti", price:"₹399", fake_price:"₹799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679604/WhatsApp_Image_2026-07-10_at_3.55.31_PM_ywvsa5.jpg", name:"Blue Stripe Thread Work Jutti", price:"₹799", fake_price:"₹1599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679604/WhatsApp_Image_2026-07-10_at_3.55.32_PM_lr3tnx.jpg", name:"Black Zebra Print Jutti", price:"₹899", fake_price:"₹1799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679604/WhatsApp_Image_2026-07-10_at_3.55.31_PM_1_svpqeb.jpg", name:"White Pink Floral Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679604/WhatsApp_Image_2026-07-10_at_3.55.30_PM_1_yhh4xd.jpg", name:"White Silver Sequin Jutti", price:"₹1099", fake_price:"₹2199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679602/WhatsApp_Image_2026-07-10_at_3.55.33_PM_1_vmhm1e.jpg", name:"Black Floral Thread Jutti", price:"₹1199", fake_price:"₹2399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679601/WhatsApp_Image_2026-07-10_at_3.55.36_PM_1_c3sxrl.jpg", name:"White Multicolour Sequin Jutti", price:"₹1299", fake_price:"₹2599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679601/WhatsApp_Image_2026-07-10_at_3.55.33_PM_bmae15.jpg", name:"White Heavy Zari Embroidered Jutti", price:"₹1399", fake_price:"₹2799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679601/WhatsApp_Image_2026-07-10_at_3.55.36_PM_bumbpe.jpg", name:"White Yellow Floral Jutti", price:"₹1499", fake_price:"₹2999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679596/WhatsApp_Image_2026-07-10_at_3.55.38_PM_z9063s.jpg", name:"White Pearl Lace Jutti", price:"₹1399", fake_price:"₹2199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679594/WhatsApp_Image_2026-07-10_at_3.55.40_PM_w0avqs.jpg", name:"Gold Kitten Heel Embroidered Sandal", price:"₹1099", fake_price:"₹2399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679594/WhatsApp_Image_2026-07-10_at_3.55.39_PM_pnk431.jpg", name:"Gold Stone Embellished Heel", price:"₹1199", fake_price:"₹2599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679594/WhatsApp_Image_2026-07-10_at_3.55.37_PM_pajlfz.jpg", name:"Gold Sequin Party Heel", price:"₹1299", fake_price:"₹2799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679594/WhatsApp_Image_2026-07-10_at_3.55.38_PM_1_fnsmjr.jpg", name:"Gold Zari Embroidered Heel", price:"₹1399", fake_price:"₹2999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679593/WhatsApp_Image_2026-07-10_at_3.55.40_PM_1_mcdiys.jpg", name:"Gold Shimmer Kitten Heel", price:"₹1499", fake_price:"₹3199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679591/WhatsApp_Image_2026-07-10_at_3.55.42_PM_feh0gt.jpg", name:"White Silver Embroidered Flat Jutti", price:"₹799", fake_price:"₹1599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679591/WhatsApp_Image_2026-07-10_at_3.55.43_PM_1_zhzbi1.jpg", name:"White Crystal Embellished Jutti", price:"₹899", fake_price:"₹1799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679591/WhatsApp_Image_2026-07-10_at_3.55.43_PM_lgyva3.jpg", name:"Gold Diamond Rhinestone Jutti", price:"₹1199", fake_price:"₹2399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679579/WhatsApp_Image_2026-07-10_at_3.55.52_PM_1_mborpo.jpg", name:"Gold Crystal Heel Mule", price:"₹1299", fake_price:"₹2599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679578/WhatsApp_Image_2026-07-10_at_3.55.52_PM_asudoe.jpg", name:"Beige Rhinestone Heel Sandal", price:"₹1399", fake_price:"₹2799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679578/WhatsApp_Image_2026-07-10_at_3.55.53_PM_uurwiv.jpg", name:"Multicolour Patchwork Block Heel", price:"₹1499", fake_price:"₹2999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679578/WhatsApp_Image_2026-07-10_at_3.55.53_PM_2_hk5gcc.jpg", name:"Black Gold Zari Embroidered Heel", price:"₹1599", fake_price:"₹3199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679578/WhatsApp_Image_2026-07-10_at_3.55.53_PM_1_bn8g8d.jpg", name:"Green Multicolour Embroidered Heel", price:"₹1699", fake_price:"₹3399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679578/WhatsApp_Image_2026-07-10_at_3.55.54_PM_bztt5n.jpg", name:"White Red Embroidered Block Heel", price:"₹1799", fake_price:"₹3599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679578/WhatsApp_Image_2026-07-10_at_3.55.54_PM_1_ht8er4.jpg", name:"White Pink Embroidered Block Heel", price:"₹1899", fake_price:"₹3799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679577/WhatsApp_Image_2026-07-10_at_3.55.57_PM_zlrj7w.jpg", name:"Magenta Pink Embroidered Block Heel", price:"₹2199", fake_price:"₹4399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679577/WhatsApp_Image_2026-07-10_at_3.55.55_PM_1_nzozhs.jpg", name:"Beige Gold Sequin Flat Jutti", price:"₹2299", fake_price:"₹4599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679577/WhatsApp_Image_2026-07-10_at_3.55.56_PM_qzridf.jpg", name:"Beige Peach Block Heel Sandal", price:"₹2399", fake_price:"₹4799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679575/WhatsApp_Image_2026-07-10_at_3.56.06_PM_symujn.jpg", name:"Black White Floral Embroidered Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679575/WhatsApp_Image_2026-07-10_at_3.56.05_PM_1_hzsrae.jpg", name:"Black Gold Zari Embroidered Mule", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679575/WhatsApp_Image_2026-07-10_at_3.55.56_PM_1_kbsqaq.jpg", name:"Pink Woven Flat Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679567/WhatsApp_Image_2026-07-10_at_3.55.58_PM_dmeo34.jpg", name:"Royal Blue Gold Embroidered Mule", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679563/WhatsApp_Image_2026-07-10_at_3.55.58_PM_1_mmt53w.jpg", name:"Multicolour Floral Embroidered Mule", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679563/WhatsApp_Image_2026-07-10_at_3.56.08_PM_qixqur.jpg", name:"White Silver Sequin Bridal Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679563/WhatsApp_Image_2026-07-10_at_3.55.59_PM_e3qmpw.jpg", name:"White Snowflake Embroidered Mule", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679563/WhatsApp_Image_2026-07-10_at_3.55.59_PM_1_plntzv.jpg", name:"Multicolour Patchwork Embroidered Mule", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679555/WhatsApp_Image_2026-07-10_at_3.56.00_PM_zxdi2p.jpg", name:"Sky Blue Floral Embroidered Jutti", price:"₹999", fake_price:"₹1990" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679553/WhatsApp_Image_2026-07-10_at_3.56.01_PM_whsadh.jpg", name:"Red Embroidered Traditional Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679553/WhatsApp_Image_2026-07-10_at_3.56.00_PM_1_abqcah.jpg", name:"Tan Brown Zari Embroidered Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679551/WhatsApp_Image_2026-07-10_at_3.56.01_PM_1_poxa2h.jpg", name:"Cream Sky Blue Embroidered Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679550/WhatsApp_Image_2026-07-10_at_3.56.13_PM_1_vvou2v.jpg", name:"White Floral Zari Bridal Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679550/WhatsApp_Image_2026-07-10_at_3.56.23_PM_w7txb5.jpg", name:"Black Floral Embroidered Jutti", price:"₹1499", fake_price:"₹2999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679550/WhatsApp_Image_2026-07-10_at_3.56.24_PM_s8wijw.jpg", name:"Black Multicolour Embroidered Jutti", price:"₹1499", fake_price:"₹2999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679549/WhatsApp_Image_2026-07-10_at_3.56.01_PM_2_x4bxqj.jpg", name:"Tan Gold Beaded Jutti", price:"₹1499", fake_price:"₹2999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679549/WhatsApp_Image_2026-07-10_at_3.56.25_PM_iaftva.jpg", name:"Gold Sequin Kitten Heel", price:"₹499", fake_price:"₹999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679547/WhatsApp_Image_2026-07-10_at_3.56.02_PM_infjhh.jpg", name:"Champagne Shimmer Heel", price:"₹599", fake_price:"₹1199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679547/WhatsApp_Image_2026-07-10_at_3.56.03_PM_mnbm5g.jpg", name:"Gold Glitter Party Heel", price:"₹699", fake_price:"₹1399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679547/WhatsApp_Image_2026-07-10_at_3.56.26_PM_mcfwpr.jpg", name:"Gold Shimmer Pointed Heel", price:"₹799", fake_price:"₹1599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679587/WhatsApp_Image_2026-07-10_at_3.55.47_PM_amldt3.jpg", name:"Gold Rhinestone Flat Jutti", price:"₹999", fake_price:"₹1999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679585/WhatsApp_Image_2026-07-10_at_3.55.46_PM_1_nc11gl.jpg", name:"Gold Bridal Embroidered Jutti", price:"₹1099", fake_price:"₹2199" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679586/WhatsApp_Image_2026-07-10_at_3.55.44_PM_1_vzfmim.jpg", name:"Gold Pearl Toe Ring Jutti", price:"₹1199", fake_price:"₹2399" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679585/WhatsApp_Image_2026-07-10_at_3.55.47_PM_1_zn1tdo.jpg", name:"Gold Heavy Zari Bridal Jutti", price:"₹1299", fake_price:"₹2599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679585/WhatsApp_Image_2026-07-10_at_3.55.45_PM_gpurbg.jpg", name:"Transparent Clear Shimmer Heel", price:"₹1399", fake_price:"₹2799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1783679585/WhatsApp_Image_2026-07-10_at_3.55.46_PM_euna1y.jpg", name:"Gold Zari Embroidered Bridal Jutti", price:"₹1499", fake_price:"₹2999" },
];

// ── kids_page — currently both gabru & mutiyar use same data ──
// Split them: first 11 go to little-gabru, rest to little-mutiyar
// You can change this split however you want
const kids_page = [
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_8_m7wfzp.jpg", name:"Floral Embroidered Jutti", price:"₹349", fake_price:"₹699" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_11_zntnio.jpg", name:"Golden Thread Jutti", price:"₹399", fake_price:"₹799" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965194/photo_crop_7_iugcph.jpg", name:"Pink Sequin Jutti", price:"₹299", fake_price:"₹599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965194/photo_crop_5_rgjcxq.jpg", name:"Ethnic Mirror Work Jutti", price:"₹449", fake_price:"₹899" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965194/photo_crop_25_xdrnwf.jpg", name:"Velvet Embroidery Jutti", price:"₹379", fake_price:"₹749" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_9_j1bqj5.jpg", name:"Multicolor Booti Jutti", price:"₹329", fake_price:"₹649" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_6_vcgrc9.jpg", name:"Pearl Embellished Jutti", price:"₹419", fake_price:"₹849" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965193/photo_crop_g2deaj.jpg", name:"Classic Red Phulkari Jutti", price:"₹359", fake_price:"₹719" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965193/photo_crop_3_evudja.jpg", name:"Blue Resham Jutti", price:"₹319", fake_price:"₹649" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965194/photo_crop_24_sldgch.jpg", name:"Festive Gold Jutti", price:"₹499", fake_price:"₹999" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965194/photo_crop_4_bgbky8.jpg", name:"Butterfly Printed Jutti", price:"₹299", fake_price:"₹599" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965196/photo_crop_15_mp6vtn.jpg", name:"Antique Zari Jutti", price:"₹459", fake_price:"₹919" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_12_pnvbcs.jpg", name:"Rainbow Pom-Pom Jutti", price:"₹339", fake_price:"₹679" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_13_zniy5p.jpg", name:"Pastel Floral Jutti", price:"₹369", fake_price:"₹749" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965195/photo_crop_10_tdcmnx.jpg", name:"Beaded Ethnic Jutti", price:"₹429", fake_price:"₹859" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965196/photo_crop_14_onviga.jpg", name:"Maroon Kundan Jutti", price:"₹389", fake_price:"₹779" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965196/photo_crop_20_cu3bcs.jpg", name:"Green Dhaga Work Jutti", price:"₹309", fake_price:"₹619" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965197/photo_crop_21_okz1yc.jpg", name:"Silver Gota Jutti", price:"₹479", fake_price:"₹959" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965196/photo_crop_16_gxzho4.jpg", name:"Purple Mojri Jutti", price:"₹349", fake_price:"₹699" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965196/photo_crop_18_eqsmec.jpg", name:"Peach Stone Studded Jutti", price:"₹409", fake_price:"₹819" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965197/photo_crop_22_ffqmgm.jpg", name:"Yellow Chikan Jutti", price:"₹329", fake_price:"₹659" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965197/photo_crop_23_mb9rkv.jpg", name:"Teal Zardozi Jutti", price:"₹469", fake_price:"₹939" },
  { link:"https://res.cloudinary.com/jdqjwumg/image/upload/v1784965196/photo_crop_19_gbop8z.jpg", name:"Orange Festive Jutti", price:"₹359", fake_price:"₹719" },
];

// Split kids: odd index → little-gabru, even index → little-mutiyar
// Change this logic however you want
const kidsGabru = kids_page.filter((_, i) => i % 2 === 0);
const kidsMutiyar = kids_page.filter((_, i) => i % 2 !== 0);

const allProducts = [
  ...Women_page.map(p => ({ ...p, category: "women", subcategory: null })),
  ...kidsGabru.map(p => ({ ...p, category: "kids", subcategory: "little-gabru" })),
  ...kidsMutiyar.map(p => ({ ...p, category: "kids", subcategory: "little-mutiyar" })),
  // Men and Wedding — empty for now, owner will add via admin portal
];

mongoose.connect(process.env.SERVER_KEY)
  .then(async () => {
    console.log("MongoDB connected");
    await Product.deleteMany({});
    await Product.insertMany(allProducts);
    console.log(`✅ Seeded ${allProducts.length} products`);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
