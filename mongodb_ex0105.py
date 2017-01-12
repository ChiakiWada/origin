#!/usr/bin/python
# coding: utf-8
import sys
import codecs
import pymongo
#from pymongo import Connection

sys.stdout = codecs.getwriter('utf_8')(sys.stdout)

#コネクション作成
#con = Connection('192.168.1.245', 27017)
#con = Connection('localhost', 27017)
con = pymongo.MongoClient('localhost', 27017)
#コネクションからsampleデータベースを取得
db = con.sample
#sampleデータベースからfooコレクションを取得
col = db.foo

def formatToInsert_yadokoumoku(ld):
    # DBの  "キー名"     : "データ"
    #return {"yadonum":ld[0], "m1":ld[1], "m2":ld[2], "m3":ld[3], "m4":ld[4], "m5":ld[5], "m6":ld[6], "g1":ld[7], "g2":ld[8], "g3":ld[9], "g4":ld[10], "g5":ld[11], "g6":ld[12]}
    return {"yadonum":ld[0], "tm":ld[1], "tg":ld[2], "m_koumoku":ld[3], "m_kazu":ld[4], "g_koumoku":ld[5], "g_kazu":ld[6]}

a=0
#宿の項目ごと syukei_yadokoumokugoto_1227sort.txt
#for line in codecs.open('syukei_yadokoumokugoto_1227sort.txt', 'r', 'utf8', 'ignore').readlines():
for line in codecs.open('syukei_yadogoto_1227sort.txt', 'r', 'utf8', 'ignore').readlines():
    line_cut = line.replace('\n','')
    line_cut2 = line_cut.replace('\r','')
    linedata = line_cut2.split('\t')

    a+=1
    col.insert(formatToInsert_yadokoumoku(linedata))
    #col.remove(formatToInsert_yadokoumoku(linedata))
    if(a==5):
        break

count=0
print "===after==="
#print col.find_one()
for data in col.find():
    count+=1
    print data
print "---total count:", count

#con.disconnect()

#####検索（find）#####
# print u"---検索---"
# print "========find_one========"
# print col.find_one()

# print "===find==="
# for data in col.find():
#     print data

# print "========find_query========"
# for data in col.find({u'a':10}):
#     print data


#####データ登録#####
# print u"\n---データ登録---"
# #データの更新
# col.insert({'b' : 10})
#
# for data in col.find():
#     print data


#####データ更新#####
# print u"\n---データ更新---"
# data = col.find_one({'b':10})
# data['b'] = 11
# #データの更新
# col.save(data)
#
# for data in col.find({u'b':11}):
#     print data


#####データ削除#####
# print u"\n---データ削除---"
# print "===before==="
# for data in col.find():
#     print data
#
# col.remove({'b':10})
