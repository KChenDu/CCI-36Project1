original = [1.1683 0 0 0;
            0 2.4142 0 0;
            0 0 -1.002 -1
            0 0 -2.002 0];

coord1 = [0; 0; 1; 1];
coord2 = [1; 0; 1; 1];
coord3 = [0; 1; 1; 1];
coord4 = [1; 1; 1; 1];
coord5 = [1; 2; 3; 1];
coord6 = [2; 3; 4; 1];

proj1 = original * coord1;
proj2 = original * coord2;
proj3 = original * coord3;
proj4 = original * coord4;
proj5 = original * coord5;
proj6 = original * coord6;

proj1 = proj1 / proj1(4);
proj2 = proj2 / proj2(4);
proj3 = proj3 / proj3(4);
proj4 = proj4 / proj4(4);
proj5 = proj5 / proj5(4);
proj6 = proj6 / proj6(4);

X1 = coord1(1);
Y1 = coord1(2);
Z1 = coord1(3);

X2 = coord2(1);
Y2 = coord2(2);
Z2 = coord2(3);

X3 = coord3(1);
Y3 = coord3(2);
Z3 = coord3(3);

X4 = coord4(1);
Y4 = coord4(2);
Z4 = coord4(3);

X5 = coord5(1);
Y5 = coord5(2);
Z5 = coord5(3);

X6 = coord6(1);
Y6 = coord6(2);
Z6 = coord6(3);

x1 = proj1(1);
y1 = proj1(2);

x2 = proj2(1);
y2 = proj2(2);

x3 = proj3(1);
y3 = proj3(2);

x4 = proj4(1);
y4 = proj4(2);

x5 = proj5(1);
y5 = proj5(2);

x6 = proj6(1);
y6 = proj6(2);

A = [X1 Y1 Z1 1 0 0 0 0 -x1 * X1 -x1 * Y1 -x1 * Z1;
     0 0 0 0 X1 Y1 Z1 1 -y1 * X1 -y1 * Y1 -y1 * Z1;
     X2 Y2 Z2 1 0 0 0 0 -x2 * X2 -x2 * Y2 -x2 * Z2;
     0 0 0 0 X2 Y2 Z2 1 -y2 * X2 -y2 * Y2 -y2 * Z2;
     X3 Y3 Z3 1 0 0 0 0 -x3 * X3 -x3 * Y3 -x3 * Z3;
     0 0 0 0 X3 Y3 Z3 1 -y3 * X3 -y3 * Y3 -y3 * Z3;
     X4 Y4 Z4 1 0 0 0 0 -x4 * X4 -x4 * Y4 -x4 * Z4;
     0 0 0 0 X4 Y4 Z4 1 -y4 * X4 -y4 * Y4 -y4 * Z4;
     X5 Y5 Z5 1 0 0 0 0 -x5 * X5 -x5 * Y5 -x5 * Z5;
     0 0 0 0 X5 Y5 Z5 1 -y5 * X5 -y5 * Y5 -y5 * Z5;
     X6 Y6 Z6 1 0 0 0 0 -x6 * X6 -x6 * Y6 -x6 * Z6;
     0 0 0 0 X6 Y6 Z6 1 -y6 * X6 -y6 * Y6 -y6 * Z6];

b = [x1; y1; x2; y2; x3; y3; x4; y4; x5; y5; x6; y6];
A\b
