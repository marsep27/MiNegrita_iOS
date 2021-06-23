visual studio code:
Repositorio:
https://github.com/marsep27/MiNegrita.git
npm install --save

APK:
	ionic cordova build --release android
Firma	keytool -genkey -v -keystore MiNegrita -alias MiNegrita -keyalg RSA -keysize 2048 -validity 10000
Fapk	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore MiNegrita app-release-unsigned.apk MiNegrita
SHA1	keytool -list -printcert -jarfile app-release-unsigned.apk
Change	zipalign -v 4 app-release-unsigned.apk MiNegrita.apk

SHA1:
	http://tomeko.net/online_tools/hex_to_base64.php
	82:C8:7B:25:F3:E9:B4:89:F5:05:27:A8:5F:76:88:43:CF:A3:51:6E
	gsh7JfPptIn1BSeoX3aIQ8+jUW4=

4542404919134939
 ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="321302089447965" --variable APP_NAME="Mi Negrita"

**IOS**
ionic cordova build --release ios
ionic cordova build ios --prod --optimizejs --minifycss --minifyjs
ionic emulate ios (Ver app en emulador)
ios-sim showdevicetypes (Ver la lista de iphones)
ionic emulate ios --target="iPhone-5s"

cambiar analytics
ng analytics off

Problema con cordova
sudo chown -R $USER /Users/cic/Library/Preferences/insight-nodejs/
sudo gem install cocoapods
