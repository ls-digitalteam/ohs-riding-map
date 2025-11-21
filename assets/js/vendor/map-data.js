
var mapParam = location.search.split('map=')[1];
if (mapParam === 'traffic') {
    var isTrafficMap = true;
}
else {
    var isTrafficMap = false;
}



var riding_maps = [
    
        ['1','212 to Belle Fourche','Take an easy ride from Belle Fourche to Highway 212.','1','44.679','-103.636','10', 'https://www.youtube.com/watch?v=Z6F9dkRFYE8&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=20',
            [
            
                ['0',new google.maps.LatLng(44.67734,-103.43153000000001) ]
            ,
                ['580',new google.maps.LatLng(44.68385000000001,-103.58784000000001) ]
            ,
                ['690',new google.maps.LatLng(44.687920000000005,-103.68906000000001) ]
            ,
                ['960',new google.maps.LatLng(44.67886,-103.81937) ]
            ,
                ['1142',new google.maps.LatLng(44.666740000000004,-103.84024000000001) ]
            
            ]
        ]
        ,
        ['2','Hwy 79 - Sturgis to Hwy 212','Ride along Highway 79 from Sturgis to Highway 212.','1','44.547','-103.439','10', 'https://www.youtube.com/watch?v=ZQ5OOHbcVXs&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=18',
            [
            
                ['0',new google.maps.LatLng(44.4164,-103.43616000000002) ]
            ,
                ['90',new google.maps.LatLng(44.461200000000005,-103.43596000000001) ]
            ,
                ['155',new google.maps.LatLng(44.500460000000004,-103.44777) ]
            ,
                ['540',new google.maps.LatLng(44.62698,-103.42746000000001) ]
            ,
                ['690',new google.maps.LatLng(44.67721,-103.43156) ]
            
            ]
        ]
        ,
        ['3','Lead to Sugar Shack','The city of Lead to Sugar Shack.','3','44.2449','-103.703','14', 'https://www.youtube.com/watch?v=3j6yV_jNnBo&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=14',
            [
            
                ['0',new google.maps.LatLng(44.3579,-103.74013000000001) ]
            ,
                ['585',new google.maps.LatLng(44.24663,-103.69282000000001) ]
            
            ]
        ]
        ,
        ['7','Keystone to Custer','Ride the city of Keystone to Custer.','3','43.8928','-103.424','15', 'https://www.youtube.com/watch?v=OYy8L_f1ehI&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=12',
            [
            
                ['0',new google.maps.LatLng(43.89627,-103.42567000000001) ]
            ,
                ['1235',new google.maps.LatLng(43.76751,-103.60037000000001) ]
            
            ]
        ]
        ,
        ['8','Nemo to Norris Peak Road','Ride from Nemo to Norris Peak Road, Rapid City.','4','44.162','-103.459','12', 'https://www.youtube.com/watch?v=2FIVbK8gLYU&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=7',
            [
            
                ['0',new google.maps.LatLng(44.19407,-103.50479000000001) ]
            ,
                ['667',new google.maps.LatLng(44.13009,-103.41269000000001) ]
            
            ]
        ]
        ,
        ['9','Norris Peak Rd to Black Hawk','Head along Norris Peak Road to Black Hawk.','4','44.1042','-103.345','11', 'https://www.youtube.com/watch?v=U3k6xc5q9MU&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=6',
            [
            
                ['0',new google.maps.LatLng(44.08485,-103.43749000000001) ]
            ,
                ['496',new google.maps.LatLng(44.16189000000001,-103.31416000000002) ]
            
            ]
        ]
        ,
        ['10','Norris Peak Road','Wind along Norris Peak Road through the Black Hills.','5','44.1021','-103.424','12', 'https://www.youtube.com/watch?v=cq2F6okyosE&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=4',
            [
            
                ['0',new google.maps.LatLng(44.12904,-103.41273000000001) ]
            ,
                ['478',new google.maps.LatLng(44.08364,-103.43779) ]
            
            ]
        ]
        ,
        ['11','Rapid City to Keystone Hwy 16','Ride Rapid City to Keystone along Hwy 16.','2','43.9671','-103.335','11', 'https://www.youtube.com/watch?v=Inx8kD1OSaU&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=17',
            [
            
                ['0',new google.maps.LatLng(44.05834,-103.23076) ]
            ,
                ['884',new google.maps.LatLng(43.89719,-103.42657000000001) ]
            
            ]
        ]
        ,
        ['12','Cheyenne Crossing to Lead','Ride Cheyenne Crossing to the city of Lead.','3','44.3349','-103.787','13', 'https://www.youtube.com/watch?v=X0DZOp577Po&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=3',
            [
            
                ['0',new google.maps.LatLng(44.29791,-103.86684000000001) ]
            ,
                ['579',new google.maps.LatLng(44.35193,-103.76832) ]
            
            ]
        ]
        ,
        ['13','Custer S-385 to Hwy 87','Ride on S-385 from Custer to the Hwy 87 intersection.','2','43.8371','-103.605','11', 'https://www.youtube.com/watch?v=B1KNAxQRQXo&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=1',
            [
            
                ['0',new google.maps.LatLng(43.7674,-103.60087000000001) ]
            ,
                ['704',new google.maps.LatLng(43.88873,-103.59018) ]
            
            ]
        ]
        ,
        ['15','Hwy 85 - Whitewood to Sturgis','Take this leisurely ride from Whitewood to Sturgis.','1','44.3629','-103.622','11', 'https://www.youtube.com/watch?v=q7oMNuIGv10&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=19',
            [
            
                ['0',new google.maps.LatLng(44.47793,-103.73966000000001) ]
            ,
                ['774',new google.maps.LatLng(44.41648000000001,-103.53349000000001) ]
            
            ]
        ]
        ,
        ['16','Interior to Wall','Ride through the Badlands as you go from Interior to Wall.','3','43.853','-102.21','10', 'https://www.youtube.com/watch?v=jlI9mukkYHk&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=10',
            [
            
                ['0',new google.maps.LatLng(43.71958,-101.96236) ]
            ,
                ['1760',new google.maps.LatLng(43.87398,-102.24010000000001) ]
            ,
                ['2044',new google.maps.LatLng(43.98698,-102.22795) ]
            
            ]
        ]
        ,
        ['17','Spearfish Canyon','Experience the beautiful Spearfish Canyon ride.','3','44.2776','-103.924','11', 'https://www.youtube.com/watch?v=lUmjF9oBV1k&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=15',
            [
            
                ['0',new google.maps.LatLng(44.49889,-103.86296000000002) ]
            ,
                ['1898',new google.maps.LatLng(44.298140000000004,-103.86711000000001) ]
            
            ]
        ]
        ,
        ['18','Sugar Shack to Hill City','Start at Sugar Shack and make your way to Hill City.','3','44.1406904','-103.5690255','14', 'https://www.youtube.com/watch?v=Cwu_M400KOQ&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=13',
            [
            
                ['0',new google.maps.LatLng(44.24644000000001,-103.69273000000001) ]
            ,
                ['2257',new google.maps.LatLng(43.93338000000001,-103.57518) ]
            
            ]
        ]
        ,
        ['19','Vanocker Canyon to Nemo','Ride through Vanocker Canyon to Nemo.','4','44.2125','-103.521','13', 'https://www.youtube.com/watch?v=RbqtJPyZBF0&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=8',
            [
            
                ['0',new google.maps.LatLng(44.386950000000006,-103.50415000000001) ]
            ,
                ['1347',new google.maps.LatLng(44.195930000000004,-103.50426) ]
            
            ]
        ]
        ,
        ['20','Interior to Rapid City','Ride from Interior to Rapid City through the Buffalo Gap National Grasslands.','2','44.0303','-103.113','11', 'https://www.youtube.com/watch?v=iXt-Unj29QY&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=16',
            [
            
                ['0',new google.maps.LatLng(43.71575000000001,-101.99579000000001) ]
            ,
                ['1376',new google.maps.LatLng(44.07959,-103.18716) ]
            
            ]
        ]
        ,
        ['21','Wind Cave National Park on Hwy 87 to Wildlife Loop','Ride from Wind Cave National Park on your way to the Wildlife Loop.','4','43.6968','-103.461','13', 'https://www.youtube.com/watch?v=KoxNpRWu8pk&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=5',
            [
            
                ['0',new google.maps.LatLng(43.760760000000005,-103.48045) ]
            ,
                ['1122',new google.maps.LatLng(43.704910000000005,-103.47839) ]
            
            ]
        ]
        ,
        ['22','Wildlife Loop Road','Ride through Custer State Park on the Wildlife Loop Road.','3','43.7534','-103.367','14', 'https://www.youtube.com/watch?v=l6m1YNEaJ4U&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=11',
            [
            
                ['0',new google.maps.LatLng(43.705310000000004,-103.47833000000001) ]
            ,
                ['1137',new google.maps.LatLng(43.647960000000005,-103.3618) ]
            ,
                ['2087',new google.maps.LatLng(43.760130000000004,-103.37020000000001) ]
            
            ]
        ]
        ,
        ['23','Wyoming to Custer via Hwy 16','Enter South Dakota toward Custer on Hwy 16.','3','43.7356','-103.597','12', 'https://www.youtube.com/watch?v=MEjKqk1CCQ4&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=9',
            [
            
                ['0',new google.maps.LatLng(43.760690000000004,-104.05343) ]
            ,
                ['1219',new google.maps.LatLng(43.76292,-103.60911000000002) ]
            
            ]
        ]
        ,
        ['24','Iron Mountain Road','Discover tunnels cut through the granite on your way to Mt. Rushmore.','5','43.8547','-103.425','11', 'https://www.youtube.com/watch?v=w3qCzIeFkwo&list=PLbdkZpOHBink3DMMUcN_hOnFE9G5BQReE&index=2',
            [
            
                ['0',new google.maps.LatLng(43.772760000000005,-103.33937) ]
            ,
                ['1978',new google.maps.LatLng(43.884780000000006,-103.43657) ]
            
            ]
        ]
        
]; 

var landmarkList = [
    
        ['Mount Rushmore National Memorial','Mount Rushmore is home to four presidents carved in stone: George Washington, Thomas Jefferson, Theodore Roosevelt and Abraham Lincoln.','/assets/img/map/74693C36-188B-4F3A-866883E4BB4A6A33.jpeg',new google.maps.LatLng(43.88223395739479,-103.45408329331639) ]
                        
];

var otherList = [
    
        ['Massa Berry Regional Medical Clinic Sturgis','890 Lazelle St Sturgis 57785','Acute Care',new google.maps.LatLng(44.415428,-103.506142),'720-2406','']
    ,
        ['Custer Regional Clinic','1041 Montgomer St Custer','Acute Care',new google.maps.LatLng(43.771844,-103.594193),'673-9420','']
    ,
        ['Belle Fourche Regional Medical Clinic','2200 13th Ave Belle Fourche','Acute Care',new google.maps.LatLng(44.649709,-103.844361),'723-8988','']
    ,
        ['Foothills Regional Medical Clinic','8075 Stage Stop Rd Summerset 57718','Acute Care',new google.maps.LatLng(44.198259,-103.352966),'755-6600','']
    ,
        ['Hill City Clinic','557 E Main St Hill City','Acute Care',new google.maps.LatLng(43.935439,-103.566053),'673-9420','']
    ,
        ['Hot Springs Fall River Hospital ','1201 Hwy 71 South Hot Springs 57747','Acute Care',new google.maps.LatLng(43.417243,-103.480075),'745-3159X3159','']
    ,
        ['Hot Springs Regional Medical Center','130 North 15th St Hot Springs 57747','Acute Care',new google.maps.LatLng(43.430268,-103.479748),'673-9420','']
    ,
        ['Lead-Deadwood Regional Medical Clinic','71 Charles St Deadwood','Acute Care',new google.maps.LatLng(44.369405,-103.729012),'717-6400','']
    ,
        ['Newell Regional Medical Clinic','101 3rd St Newell 57760','Acute Care',new google.maps.LatLng(44.714696,-103.420571),'644-4432','']
    ,
        ['Sioux San Hospital Rapid City','3200 Canyon Lake Dr Rapid City 57702','Acute Care',new google.maps.LatLng(44.074217,-103.271702),'355-2469','']
    ,
        ['Spearfish Queen City Regional Medical Center','1420 N 10th St Spearfish 57783','Acute Care',new google.maps.LatLng(44.498427,-103.855025),'717-8529','']
    ,
        ['Community Health Center of Black Hills Rapid City','504 E Monroe St Rapid City 57701','Acute Care',new google.maps.LatLng(44.090715,-103.203213),'721-8939','']
    ,
        ['Medical Arts Clinic St Francis St Rapid City','717 St Francis St Rapid City','Acute Care',new google.maps.LatLng(44.066263,-103.231118),'718-2010/342/2280','']
    ,
        ['Black Hills Urgent Care Haines Ave','1730 Haine Ave Rapid City','Acute Care',new google.maps.LatLng(44.101823,-103.221302),'721-4908','']
    ,
        ['Black Hills Urgent Care Mt View Rd','741 Mountain View Rd Rapid City 57702','Acute Care',new google.maps.LatLng(44.079624,-103.252409),'721-4908','']
    ,
        ['Regional Medical Clinic Flormann St Rapid City','640 Flormann St Rapid City','Acute Care',new google.maps.LatLng(44.06502,-103.228727),'718-3361','']
    ,
        ['RCMC Urgent Care Clinic Mt Rushmore Rd Rapid City','2820 Mt Rushmore Rd Rapid City 57701','Acute Care',new google.maps.LatLng(44.057172,-103.231402),'755-6600','']
    ,
        ['Regional Urgent Care Knollwood DR (RC)','408 Knollwood Dr Rapid City 57701','Acute Care',new google.maps.LatLng(44.103231,-103.220753),'755-6600','']
    ,
        ['EmergiClinic Urgent Care Jackson Blvd. (RC)','2116 Jackson Blvd Rapid City 57702','Acute Care',new google.maps.LatLng(44.073435,-103.254685),'755-6600','']
    ,
        ['Health Concepts Urgent Care Sheridan Lake Rd (RC)','5410 Sheridan Lake Rd Rapid City 57702','Acute Care',new google.maps.LatLng(44.031301,-103.27125),'','']
    ,
        ['Sturgis Community Center','','Red Cross',new google.maps.LatLng(44.415924,-103.516241),'','']
    ,
        ['Sturgis City Hall','','Red Cross',new google.maps.LatLng(44.413955,-103.512747),'','']
    ,
        ['BUTTE COUNTY SHERIFFS OFFICE','SHERIFFS OFFICES (EXCEPT COURT FUNCTIONS ONLY)','Police',new google.maps.LatLng(44.6686451,-103.8531446),'605-892-3324','']
    ,
        ['BELLE FOURCHE POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.6665643,-103.849568),'605-892-4354','']
    ,
        ['CUSTER COUNTY SHERIFFS DEPARTMENT','SHERIFFS OFFICES (EXCEPT COURT FUNCTIONS ONLY)','Police',new google.maps.LatLng(43.7654951,-103.5999676),'605-673-8146','']
    ,
        ['SOUTH DAKOTA STATE HIGHWAY PATROL - SOUTHERN HILLS OFFICE','HIGHWAY PATROLS, POLICE','Police',new google.maps.LatLng(43.7608637,-103.6099864),'605-673-5677','']
    ,
        ['FALL RIVER COUNTY SHERIFFS OFFICE / FALL RIVER COUNTY JAIL','SHERIFFS OFFICES (EXCEPT COURT FUNCTIONS ONLY)','Police',new google.maps.LatLng(43.4393428,-103.4804129),'605-745-4444','']
    ,
        ['HOT SPRINGS POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(43.4320991,-103.4768021),'605-745-5200','']
    ,
        ['LEAD POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.3508347,-103.772502),'605-584-1615','']
    ,
        ['WHITEWOOD POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.4597726,-103.6403284),'605-269-2550','']
    ,
        ['DEADWOOD POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.3736518,-103.7291892),'605-578-2623','']
    ,
        ['LAWRENCE COUNTY SHERIFFS OFFICE / LAWRENCE COUNTY JAIL','SHERIFFS OFFICES (EXCEPT COURT FUNCTIONS ONLY)','Police',new google.maps.LatLng(44.374336,-103.7295614),'605-578-2230','']
    ,
        ['SPEARFISH POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.4894246,-103.860977),'605-642-1300','']
    ,
        ['SUMMERSET POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.1788465,-103.3340458),'605-718-9858','']
    ,
        ['STURGIS POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.414299,-103.5159494),'605-347-5070','']
    ,
        ['MEADE COUNTY SHERIFFS OFFICE / MEADE COUNTY JAIL','SHERIFFS OFFICES (EXCEPT COURT FUNCTIONS ONLY)','Police',new google.maps.LatLng(44.4143075,-103.5159375),'605-347-2681','']
    ,
        ['NEW UNDERWOOD POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.0935378,-102.8360756),'605-754-6767','']
    ,
        ['BOX ELDER POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.1332072,-103.0702941),'605-923-1401','']
    ,
        ['PENNINGTON COUNTY SHERIFFS OFFICE','SHERIFFS OFFICES (EXCEPT COURT FUNCTIONS ONLY)','Police',new google.maps.LatLng(44.0783543,-103.2220593),'605-394-6113','']
    ,
        ['RAPID CITY POLICE DEPARTMENT','POLICE DEPARTMENTS (EXCEPT AMERICAN INDIAN OR ALASKA NATIVE)','Police',new google.maps.LatLng(44.0783515,-103.2220586),'605-394-4133','']
    ,
        ['SOUTH DAKOTA HIGHWAY PATROL DISTRICT 3 - HEADQUARTERS','HIGHWAY PATROLS, POLICE','Police',new google.maps.LatLng(44.096743,-103.17690),'605-394-2286','']
    ,
        ['SOUTH DAKOTA HIGHWAY PATROL - TILFORD PORT OF ENTRY','HIGHWAY PATROLS, POLICE','Police',new google.maps.LatLng(44.3177727,-103.4373645),'605-347-2671','']
    ,
        ['CUSTER REGIONAL HOSPITAL','LOCATED ON THE NW SIDE OF MONTGOMERY ST BETWEEN N 10TH ST AND LINCOLN ST.','Hospital',new google.maps.LatLng(43.7726625,-103.5941203),'605-673-2229','']
    ,
        ['FALL RIVER HEALTH SERVICES','NORTHEAST CORNER OF NORTH 16TH STREET AND JENNINGS AVENUE.','Hospital',new google.maps.LatLng(43.4311817,-103.4801441),'605-745-3159','']
    ,
        ['LEAD-DEADWOOD REGIONAL HOSPITAL','LOCATED ON THE SOUTHEAST SIDE OF CHARLES STREET BETWEEN STEWART ST AND FILMORE ST.','Hospital',new google.maps.LatLng(44.3696269,-103.7282684),'605-722-6101','']
    ,
        ['SPEARFISH REGIONAL HOSPITAL','LOCATED ON THE EAST SIDE OF NORTH MAIN STREET BETWEEN PEORIA STREET AND WEST QUINCY STREET.','Hospital',new google.maps.LatLng(44.4980637,-103.8606446),'605-644-4000','']
    ,
        ['STURGIS REGIONAL HOSPITAL','LOCATED ON THE NORTHWEST CORNER OF HARMON STREET AND FULTON STREET','Hospital',new google.maps.LatLng(44.4021073,-103.5067975),'605-347-2536','']
    ,
        ['RAPID CITY REGIONAL HOSPITAL','LOCATED ON THE SOUTH SIDE OF FAIRMONT BOULEVARD BETWEEN 3RD STREET AND 5TH STREET.','Hospital',new google.maps.LatLng(44.0577486,-103.2252503),'605-719-1000','']
    
];

$(function(){
    function initialize() {
        var myLatlng = new google.maps.LatLng(44.106210, -103.221866);
        var mapOptions = {
            zoom: 8,
            center: myLatlng,
            fullscreenControl: false
        }

        var map = new google.maps.Map(document.getElementById('traffic_map'), mapOptions);
        google.maps.event.addListenerOnce(map, 'idle', switchToMap());

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
        
        DisplayOtherPins(map,otherList);
        if (isTrafficMap) {
            switchToMap(true);
        }
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    InitPublicRidingMaps(riding_maps,'ride_videoFilePlayer','ride_Map');
    DisplayLandmarks(VideoRider._gmap,landmarkList);
});
