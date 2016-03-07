# ExpressAndMongo
このプログラムはlocalhost:3000を利用してクライアントとの情報をやりとりし、そのデータをmongodbに格納するプログラムです。
最初に同ディレクトリのdbをmongoDBのdbpathにするため、cmdを起動し、このプログラムのあるC:\Users\tsuno\Documents\Visual Studio 2015\Projects\ExpressAndMongo\ExpressAndMongoまで移動し、

$ mongod --nojournal --noprealloc --dbpath db

を入力してください。
正常にmongoDBが起動したら、別のcmdを立ち上げて、

$ mongo

を入力し、データベースにアクセスしてください。

動作確認をします。

$ show dbs

と入力してRecordとlocalが出たらOKです。

$ use Record
$ show collections

と入力してrecordsがあったら、

$ db.records.find();

で、中身があるかを確認してください。

主な命令は
$ db.records.remove({Query});
$ db.records.insert({Query});
$ db.records.find({Query});   //{}省略可
でことたりるはずです。本番環境下でremoveを使用しないこと。