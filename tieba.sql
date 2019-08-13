/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.19 : Database - tieba_ts
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tieba_ts` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `tieba_ts`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ba_id` int(11) NOT NULL,
  `title` char(20) NOT NULL,
  `content` text NOT NULL,
  `publish_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `article` */

insert  into `article`(`id`,`user_id`,`ba_id`,`title`,`content`,`publish_time`,`update_time`) values (1,3,2,'这是我们的主场，上海地铁中华艺术宫站期待','{2019DOTA2国际邀请赛（以下简称TI9）是全体DOTA2玩家的盛大聚会，届时将有无数DOTA2玩家前往赛事举办地梅赛德斯-奔驰文化中心。继玩家前往比赛场馆的重要换乘站——世纪大道地铁站后，近日，乘地铁前往梅赛德斯-奔驰文化中心的必经站点中华艺术宫地铁站也已完成DOTA2风格装扮，让玩家踏出地铁，就沉浸在DOTA2的世界之中，感受到DOTA2国际邀请赛的独特氛围！}[https://imgsa.baidu.com/forum/w%3D580/sign=c0fda135af44ad342ebf878fe0a00c08/e3935ba98226cffc4fc9bc6ab7014a90f403ea59.jpg]{本次完成DOTA2国际邀请赛主题装扮的是中华艺术宫地铁站，是上海轨道交通8号线的重要一站。本站4号口直通TI9主赛事场馆梅赛德斯-奔驰文化中心，是前往观看TI9的必经一站。目前，地铁站以换上了DOTA2主题的宣传内容，不仅会让DOTA2玩家体会到越来越浓的国际邀请赛气氛，也吸引了众多市民来了解TI9和DOTA2！}[https://imgsa.baidu.com/forum/w%3D580/sign=51d6dd2cb94543a9f51bfac42e158a7b/c9c0e5faaf51f3de5640babc9aeef01f3829794a.jpg]{“以热血铸梦想，以荣耀塑辉煌，DOTA2，这一次我将跟随你的脚步，一起拼到底，赢下去。”}[https://imgsa.baidu.com/forum/w%3D580/sign=a7349b86d3c451daf6f60ce386ff52a5/31ee14d7912397dd1da59bdc5782b2b7d2a28764.jpg]','2019-08-08 00:00:00','2019-08-08 00:00:00'),(2,1,3,'使用说明','{此项目为练习vue+typescript，目前还处于未完成状态（可能继续更新），以下为介绍部分功能。<br>1.首页会推送一些文章（但目前你只能看到这一篇）与特别关注，特别关注是指你可以关注最近你所感兴趣的贴吧，你可以在首页的特殊关注下接收到相应帖子（因为目前你没有特别关注帖吧，所以并没有任何内容）<br>2.在关注页面下，会显示你所关注的所有贴吧或是其他用户（用户功能并没有实现）<br>3.你会发现除了最开始推送的这篇帖子以外并没有任何内容了，此时，搜索框便派上了用途，输入关键字，按下enter或点击图标即可。（需要热心提醒你，数据库里只有dota2与bilibili两个贴吧，所以关键字建议向这两个吧靠拢，不用输入完整）<br>4.正常情况，你会搜索到贴吧以及相应的帖子，点击即可进入。之后的关注，回复，便不再赘诉（如果你发现有奇怪的地方，没错，我并没有实现有些功能）<br>5.右上角头像，对于你来说是损坏的图片，因为我并没有实现上传图片功能o(*￣︶￣*)o，不过，你可以选择登陆我准备好的账号。此处可以看到个人主页与退出选项。个人主页，修改信息（会有一个prop sync的报错，不太影响）。退出后，会保存缓存，也可以清理缓存。<br>6.当然，你也可以尽情调戏地址栏<br>7.所有功能大致介绍完，感谢阅读到此，谢谢！！！}[https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563176739940&di=365977b351cac8fadb2568547fcbc69b&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fpview%2Fevent_poster%2Fraw%2Fpublic%2F4b9f644354eb714.jpg]','2019-08-11 17:25:00','2019-08-11 17:25:00'),(3,8,1,'名场景复刻','{C96 enako 雷姆}[https://imgsa.baidu.com/forum/w%3D580/sign=ce6643ac4da98226b8c12b2fba80b97a/15591bdbb6fd5266f5b4fdcda518972bd60736da.jpg]','2019-08-11 18:05:00','2019-08-11 18:05:00'),(4,12,2,'关于至宝投票，能根据自己的内心来么？','[https://imgsa.baidu.com/forum/w%3D580/sign=0e46f5e8af8b87d65042ab1737092860/85dfabde9c82d15871e51e688e0a19d8be3e42de.jpg][https://imgsa.baidu.com/forum/w%3D580/sign=395bd36289d6277fe912323018391f63/e7088482d158ccbfd2dbf2e317d8bc3eb33541de.jpg][https://imgsa.baidu.com/forum/w%3D580/sign=2caab90678094b36db921be593cd7c00/a2d56b8da9773912ae1cc2b8f6198618377ae203.jpg][https://imgsa.baidu.com/forum/w%3D580/sign=a2d130dd990a304e5222a0f2e1caa7c3/3fb5ee246b600c33d88a9a11144c510fdbf9a14a.jpg]','2019-08-13 19:21:00','2019-08-13 19:21:00'),(5,15,1,'微软、索尼和任天堂御三家将要求厂商公布开','[https://imgsa.baidu.com/forum/w%3D580/sign=791d85cdb2315c6043956be7bdb3cbe6/dfa48eaf2edda3cce53a91f80fe93901233f929a.jpg][https://imgsa.baidu.com/forum/w%3D580/sign=c083284050df8db1bc2e7c6c3921dddb/375e5ed98d1001e9a5e23dd7b60e7bec56e7979a.jpg][https://imgsa.baidu.com/forum/w%3D580/sign=0549f4ccb699a9013b355b3e2d940a58/63a48dc379310a55a960f62cb94543a983261037.jpg]','2019-08-13 19:32:00','2019-08-13 19:32:00');

/*Table structure for table `ba` */

DROP TABLE IF EXISTS `ba`;

CREATE TABLE `ba` (
  `id` int(11) NOT NULL,
  `name` char(20) NOT NULL,
  `url` char(20) NOT NULL,
  `img` text NOT NULL,
  `bg_img` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ba` */

insert  into `ba`(`id`,`name`,`url`,`img`,`bg_img`) values (1,'bilibili','bilibili','https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=e449f54229ec5a31edd2de321e1228e1&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F714fc51190ef76c6bee77a1d9416fdfaaf516765.jpg','https://imgsa.baidu.com/forum/pic/item/d40735fae6cd7b89f739751e0d2442a7d8330ed1.jpg'),(2,'dota2','dota2','https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=55293a43c693aae514984e6ae9877753&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F0b7b02087bf40ad1b310bb105d2c11dfa8ecce49.jpg','https://tb1.bdstatic.com/tb/cms/frs/bg/default_head20141014.jpg'),(3,'推荐','recommend','','');

/*Table structure for table `reply` */

DROP TABLE IF EXISTS `reply`;

CREATE TABLE `reply` (
  `a_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `is_owner` tinyint(1) NOT NULL,
  `target` int(11) DEFAULT NULL,
  `target_name` char(16) DEFAULT NULL,
  `reply_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `reply` */

insert  into `reply`(`a_id`,`user_id`,`floor_id`,`content`,`is_owner`,`target`,`target_name`,`reply_time`) values (1,4,2,'{你可真惨}',1,NULL,NULL,'2019-08-08 14:42:00'),(1,5,3,'{《排面》}',1,NULL,NULL,'2019-08-08 14:43:00'),(1,6,3,'{有个鸡儿的排面，图里面就2跟柱子贴了。。。}',0,NULL,NULL,'2019-08-08 17:05:00'),(1,7,3,'{这柱子挺值钱的，几十万要吧？}',0,NULL,NULL,'2019-08-08 18:51:00'),(1,1,2,'{test<br>test2}',0,NULL,NULL,'2019-08-10 20:44:26'),(1,1,2,'{asdas<br>asdasdas}',0,NULL,NULL,'2019-08-10 21:25:01'),(1,1,4,'{test3<br>test4}[http://5b0988e595225.cdn.sohucs.com/images/20180901/6287a1083e7641a6bb380c67a04d815d.jpeg]{asdasd}',1,NULL,NULL,'2019-08-10 21:29:07'),(1,1,3,'{asdasdsad}',0,NULL,NULL,'2019-08-11 12:01:19'),(1,1,3,'{ssssss}',0,7,'乞求者','2019-08-11 12:23:26'),(1,1,4,'{test}',0,NULL,NULL,'2019-08-11 15:44:33'),(3,9,2,'{enako这阵势很正常}',1,NULL,NULL,'2019-08-11 18:07:00'),(3,10,3,'{这个场景被形容成啥来着？}',1,NULL,NULL,'2019-08-11 18:07:11'),(3,8,4,'[https://imgsa.baidu.com/forum/w%3D580/sign=20aa21d68994a4c20a23e7233ef51bac/14983bd8bc3eb135c5d87762a81ea8d3fc1f445b.jpg][https://imgsa.baidu.com/forum/w%3D580/sign=92d615179725bc312b5d01906ede8de7/e29b6936acaf2edd1cef8930831001e938019364.jpg]',1,NULL,NULL,'2019-08-11 19:00:00'),(4,13,2,'{其实抵制奸商的人真没你们想的那么多，那年小精灵没有奸商不是照样冲到了决赛，大家就是图个乐呵}',1,NULL,NULL,'2019-08-13 19:23:00'),(4,14,3,'{all in 蓝胖}',1,NULL,NULL,'2019-08-13 19:24:48'),(5,16,2,'{这个公布意思是出货率百分之几什么的还是说直接显示还要多少发才能出货的那种}',1,NULL,NULL,'2019-08-13 19:34:00'),(5,17,3,'{就算说了又有什么用吗？反正都是伪随机，该抽不到的还是抽不到}',1,NULL,NULL,'2019-08-13 19:35:00');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` char(16) NOT NULL,
  `name` char(16) NOT NULL,
  `password` char(20) NOT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `head_img` text,
  `register_time` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`login_name`,`name`,`password`,`sex`,`head_img`,`register_time`) values (1,'iroha','iroha','123456',0,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1563186077&di=81f3a719d4315d27a500d7b8e4abc00f&src=http://b-ssl.duitang.com/uploads/item/201607/30/20160730131742_TNhdE.thumb.700_0.jpeg','2019-08-04'),(2,'test','test1','123456',1,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565082188717&di=704299da0dfead041cbc0c5190fa5de9&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2Fc42d25e7b2e572ee41ac37bb2b9477e61baa831c.jpg','2019-08-05'),(3,'wanmei','完美DOTA2刀塔','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/d8e777cc?t=1515903265','2019-08-09'),(4,'test2','菜里的姜','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/8260af3f?t=1556719568','2019-08-10'),(5,'what_ive__done','what_ive__done','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/6c841253?t=1436864841','2019-08-10'),(6,'test3','lgd斯蒂司','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/f011500b?t=1454380010','2019-08-10'),(7,'test4','乞求者','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/a68d3818','2019-08-10'),(8,'test5','西城宫弦月','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/89d1cc7f?t=1559434947','2019-08-11'),(9,'test6','七宗罪灬路明非','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/16a5861b?t=1565157088','2019-08-11'),(10,'test7','徒花','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/ff03732c?t=1534823871','2019-08-11'),(11,'test8','asdas','adasdas',0,NULL,'2019-08-13'),(12,'test9','Fourock','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/19909f17?t=1552969887','2019-08-13'),(13,'test10','老黄-剑九','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/f31a1026?t=1515616415','2019-08-13'),(14,'test11','jkhgxuxu','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/4132a921?t=1405748505','2019-08-13'),(15,'test12','帝天','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/7ab76521?t=1539073465','2019-08-13'),(16,'test13','贴吧用户_54eCDND','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/7df77fd3?t=1548294395','2019-08-13'),(17,'test14','真理的彼方','123456',NULL,'http://tb.himg.baidu.com/sys/portrait/item/89089f2f?t=1560004658','2019-08-13');

/*Table structure for table `user_ba` */

DROP TABLE IF EXISTS `user_ba`;

CREATE TABLE `user_ba` (
  `user_id` int(11) NOT NULL,
  `ba_id` int(11) NOT NULL,
  `special` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_ba` */

insert  into `user_ba`(`user_id`,`ba_id`,`special`) values (1,2,1),(1,1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
