# PCFControls
## Button Control
It's a most common ask to have a button on the Model driven form but there is no OOB (Out Of the Box) way. 

When the PCF was intrdouced (4 years ago), I have created a [PCF control (https://github.com/ManirajKV/PCF) ] to achieve this requirement. It worked very well so far and thought of upgrading the button control to use the Fluent UI Button control. It will give similar look to the control in the Model Driven Apps.

### Screenshots

### How to Install
1. Download the latest solution from here
2. Import the latest solution in your environment

### Configure the Control
1. Once the soluton is installed
2. Navigate to the MDA form to configure the feild to show as button   
4. Click Add Component and select Button Control

>Note: This button control available only for the text field

 ![image](https://user-images.githubusercontent.com/125174051/219654458-a075180f-98d7-400f-bf7e-af98f6f44235.png)
 
 4.Configure following propeties in the control
 
 ![image](https://user-images.githubusercontent.com/125174051/219655546-e1951100-edb5-4615-918c-4059b66b3cc2.png)
   
 5. Button Properties
    - Type - There are 4 different type of butttons can be rendered using this control
      - 0 - Standard
      
      ![image](https://user-images.githubusercontent.com/125174051/219667477-c78b2d05-9f37-4b47-88af-c4b14ad5cc2a.png)

      - 1 - Primary
      
      ![image](https://user-images.githubusercontent.com/125174051/219668265-a23ae8d3-91ce-4888-b84e-28944c10bcae.png)
     
      - 2 - Action
      
      ![image](https://user-images.githubusercontent.com/125174051/219668496-ae85ea52-b5f2-4998-9a29-dbd59a9279d4.png)
      
      - 3 - Icon
       
       ![image](https://user-images.githubusercontent.com/125174051/219668862-34590407-7cf5-407d-b64a-76ef017553d4.png)


    - Label - It helps to configure the name for the button
    - Icon - It helps to configure the icon for the button and it supports only the fluent ui icons (https://uifabricicons.azurewebsites.net/)

>**Tip:** use the tooltip to know more about the each input

![image](https://user-images.githubusercontent.com/125174051/219658015-0963bd1e-969a-42c5-9783-3c36a4bceb2a.png)

### Configure click event
When the button clicked, it triggers the onchange event in the field by setting field value as `Button label's` value. 

If there is no button label value in the control, it set as `Clicked`

