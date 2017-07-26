# react-imago3d

*react-imago3d* is a vr environment editor. Make WebVR easily creating your own scene with built in 3d object and use your browser or vr headset to see what you builded in real time.

### Live demo
http://alessiodicrescenzo.com/react-imago3d/

### Getting Started

1. clone or download this repository
```
git clone https://github.com/kenta88/react-imago3d.git
```
2. inside react-imago3d install dependencies
```
npm install
```
3.run the application
```
npm run start
```
4.open your browser at
```
http://localhost:3006/
```

### How this is working
1. click on left menu icon to see the following 3d objects and choose one of them.
```
Wall
Window
Floor
```
2. now you can move the object around the scene. Click `R` button to rotate the object.
3. Add the object to the scene with `doubleClick`. (you can also drag the object to put them automatically)
3. `esc` to leave the adding mode.
4. edit a selected object with `doubleClick`.
5. now you can move it again. if you wanna remove just leave the adding mode by `esc`button.
6. to remove object in series, you can drag keeping pressed `shift`button
7. to put object on a different level, click on arrows in the top bar.
8. to see your scene by VR, save the scene and go to `http://localhost:3006/viewer`

