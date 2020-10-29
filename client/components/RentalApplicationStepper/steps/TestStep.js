import React, { useState, useRef, useEffect } from 'react';

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const TestStep = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacinia quis
      nulla ac tincidunt. Duis maximus tincidunt lorem ut fermentum. Duis eget
      elit efficitur ex malesuada molestie. Morbi tincidunt accumsan purus, non
      pharetra nisl varius in. Aliquam eleifend eros ex, ac tincidunt leo
      porttitor vel. Donec ut orci tellus. Duis et mi tristique, consequat
      mauris in, aliquam sapien. Praesent in massa et ante ornare varius ac sed
      nibh. Curabitur tristique ex eget neque semper tristique. Vestibulum sed
      consectetur libero, fringilla cursus ex. Nulla non enim efficitur,
      malesuada enim a, efficitur nulla. Morbi ligula turpis, vehicula in
      dignissim id, consectetur at nibh. Morbi semper tellus felis, in
      sollicitudin augue mollis sit amet. Nam ut lacus ex. Nulla facilisi.
      Vestibulum ut rutrum massa, hendrerit commodo erat. Fusce mattis, turpis a
      lobortis consequat, tortor urna maximus nunc, vitae tincidunt orci ipsum
      et est. Nunc viverra venenatis turpis sit amet auctor. Integer a ipsum et
      ex sagittis aliquet. Quisque elementum sed tellus ac aliquam. Duis arcu
      quam, lacinia eget lacus vel, consequat condimentum turpis. In efficitur,
      leo quis iaculis accumsan, ante ipsum dapibus enim, sit amet semper lectus
      lorem id orci. Sed gravida nunc libero, at accumsan urna posuere ut.
      Vestibulum porta eget risus a elementum. Cras quis augue vitae sem luctus
      eleifend condimentum vel ipsum. Aliquam consequat odio eget purus ornare,
      tempus tristique dolor efficitur. Suspendisse ante nisl, aliquam ut
      consectetur ac, venenatis ut nisl. Duis congue tempus lectus sed
      sollicitudin. Donec tristique ultricies lacus, at consectetur eros. Donec
      arcu metus, pellentesque nec augue eget, volutpat auctor dolor. Mauris et
      metus augue. Sed accumsan velit erat, ac tempus nunc euismod vitae. Nulla
      porta purus mi, eu egestas elit condimentum sit amet. Morbi nunc orci,
      auctor quis consequat ut, consequat at libero. Nulla facilisi. Morbi
      hendrerit in elit vel posuere. Integer eget augue consectetur, pharetra
      orci vel, ullamcorper est. Proin rhoncus nunc nibh, ut malesuada ipsum
      tempor id. Nullam ac libero odio. Vestibulum a aliquet nulla. Phasellus
      euismod tristique dapibus. Phasellus pellentesque porta lacus a consequat.
      Fusce faucibus ligula elit, quis imperdiet lorem pulvinar non. Donec
      dictum aliquet risus eu bibendum. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Praesent nisl lorem, malesuada sit amet semper
      eu, sodales eget orci. Pellentesque mauris tellus, vulputate vitae
      dignissim et, aliquet ultrices est. Donec in augue libero. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Nunc lacinia quis nulla ac
      tincidunt. Duis maximus tincidunt lorem ut fermentum. Duis eget elit
      efficitur ex malesuada molestie. Morbi tincidunt accumsan purus, non
      pharetra nisl varius in. Aliquam eleifend eros ex, ac tincidunt leo
      porttitor vel. Donec ut orci tellus. Duis et mi tristique, consequat
      mauris in, aliquam sapien. Praesent in massa et ante ornare varius ac sed
      nibh. Curabitur tristique ex eget neque semper tristique. Vestibulum sed
      consectetur libero, fringilla cursus ex. Nulla non enim efficitur,
      malesuada enim a, efficitur nulla. Morbi ligula turpis, vehicula in
      dignissim id, consectetur at nibh. Morbi semper tellus felis, in
      sollicitudin augue mollis sit amet. Nam ut lacus ex. Nulla facilisi.
      Vestibulum ut rutrum massa, hendrerit commodo erat. Fusce mattis, turpis a
      lobortis consequat, tortor urna maximus nunc, vitae tincidunt orci ipsum
      et est. Nunc viverra venenatis turpis sit amet auctor. Integer a ipsum et
      ex sagittis aliquet. Quisque elementum sed tellus ac aliquam. Duis arcu
      quam, lacinia eget lacus vel, consequat condimentum turpis. In efficitur,
      leo quis iaculis accumsan, ante ipsum dapibus enim, sit amet semper lectus
      lorem id orci. Sed gravida nunc libero, at accumsan urna posuere ut.
      Vestibulum porta eget risus a elementum. Cras quis augue vitae sem luctus
      eleifend condimentum vel ipsum. Aliquam consequat odio eget purus ornare,
      tempus tristique dolor efficitur. Suspendisse ante nisl, aliquam ut
      consectetur ac, venenatis ut nisl. Duis congue tempus lectus sed
      sollicitudin. Donec tristique ultricies lacus, at consectetur eros. Donec
      arcu metus, pellentesque nec augue eget, volutpat auctor dolor. Mauris et
      metus augue. Sed accumsan velit erat, ac tempus nunc euismod vitae. Nulla
      porta purus mi, eu egestas elit condimentum sit amet. Morbi nunc orci,
      auctor quis consequat ut, consequat at libero. Nulla facilisi. Morbi
      hendrerit in elit vel posuere. Integer eget augue consectetur, pharetra
      orci vel, ullamcorper est. Proin rhoncus nunc nibh, ut malesuada ipsum
      tempor id. Nullam ac libero odio. Vestibulum a aliquet nulla. Phasellus
      euismod tristique dapibus. Phasellus pellentesque porta lacus a consequat.
      Fusce faucibus ligula elit, quis imperdiet lorem pulvinar non. Donec
      dictum aliquet risus eu bibendum. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Praesent nisl lorem, malesuada sit amet semper
      eu, sodales eget orci. Pellentesque mauris tellus, vulputate vitae
      dignissim et, aliquet ultrices est. Donec in augue libero. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Nunc lacinia quis nulla ac
      tincidunt. Duis maximus tincidunt lorem ut fermentum. Duis eget elit
      efficitur ex malesuada molestie. Morbi tincidunt accumsan purus, non
      pharetra nisl varius in. Aliquam eleifend eros ex, ac tincidunt leo
      porttitor vel. Donec ut orci tellus. Duis et mi tristique, consequat
      mauris in, aliquam sapien. Praesent in massa et ante ornare varius ac sed
      nibh. Curabitur tristique ex eget neque semper tristique. Vestibulum sed
      consectetur libero, fringilla cursus ex. Nulla non enim efficitur,
      malesuada enim a, efficitur nulla. Morbi ligula turpis, vehicula in
      dignissim id, consectetur at nibh. Morbi semper tellus felis, in
      sollicitudin augue mollis sit amet. Nam ut lacus ex. Nulla facilisi.
      Vestibulum ut rutrum massa, hendrerit commodo erat. Fusce mattis, turpis a
      lobortis consequat, tortor urna maximus nunc, vitae tincidunt orci ipsum
      et est. Nunc viverra venenatis turpis sit amet auctor. Integer a ipsum et
      ex sagittis aliquet. Quisque elementum sed tellus ac aliquam. Duis arcu
      quam, lacinia eget lacus vel, consequat condimentum turpis. In efficitur,
      leo quis iaculis accumsan, ante ipsum dapibus enim, sit amet semper lectus
      lorem id orci. Sed gravida nunc libero, at accumsan urna posuere ut.
      Vestibulum porta eget risus a elementum. Cras quis augue vitae sem luctus
      eleifend condimentum vel ipsum. Aliquam consequat odio eget purus ornare,
      tempus tristique dolor efficitur. Suspendisse ante nisl, aliquam ut
      consectetur ac, venenatis ut nisl. Duis congue tempus lectus sed
      sollicitudin. Donec tristique ultricies lacus, at consectetur eros. Donec
      arcu metus, pellentesque nec augue eget, volutpat auctor dolor. Mauris et
      metus augue. Sed accumsan velit erat, ac tempus nunc euismod vitae. Nulla
      porta purus mi, eu egestas elit condimentum sit amet. Morbi nunc orci,
      auctor quis consequat ut, consequat at libero. Nulla facilisi. Morbi
      hendrerit in elit vel posuere. Integer eget augue consectetur, pharetra
      orci vel, ullamcorper est. Proin rhoncus nunc nibh, ut malesuada ipsum
      tempor id. Nullam ac libero odio. Vestibulum a aliquet nulla. Phasellus
      euismod tristique dapibus. Phasellus pellentesque porta lacus a consequat.
      Fusce faucibus ligula elit, quis imperdiet lorem pulvinar non. Donec
      dictum aliquet risus eu bibendum. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Praesent nisl lorem, malesuada sit amet semper
      eu, sodales eget orci. Pellentesque mauris tellus, vulputate vitae
      dignissim et, aliquet ultrices est. Donec in augue libero. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Nunc lacinia quis nulla ac
      tincidunt. Duis maximus tincidunt lorem ut fermentum. Duis eget elit
      efficitur ex malesuada molestie. Morbi tincidunt accumsan purus, non
      pharetra nisl varius in. Aliquam eleifend eros ex, ac tincidunt leo
      porttitor vel. Donec ut orci tellus. Duis et mi tristique, consequat
      mauris in, aliquam sapien. Praesent in massa et ante ornare varius ac sed
      nibh. Curabitur tristique ex eget neque semper tristique. Vestibulum sed
      consectetur libero, fringilla cursus ex. Nulla non enim efficitur,
      malesuada enim a, efficitur nulla. Morbi ligula turpis, vehicula in
      dignissim id, consectetur at nibh. Morbi semper tellus felis, in
      sollicitudin augue mollis sit amet. Nam ut lacus ex. Nulla facilisi.
      Vestibulum ut rutrum massa, hendrerit commodo erat. Fusce mattis, turpis a
      lobortis consequat, tortor urna maximus nunc, vitae tincidunt orci ipsum
      et est. Nunc viverra venenatis turpis sit amet auctor. Integer a ipsum et
      ex sagittis aliquet. Quisque elementum sed tellus ac aliquam. Duis arcu
      quam, lacinia eget lacus vel, consequat condimentum turpis. In efficitur,
      leo quis iaculis accumsan, ante ipsum dapibus enim, sit amet semper lectus
      lorem id orci. Sed gravida nunc libero, at accumsan urna posuere ut.
      Vestibulum porta eget risus a elementum. Cras quis augue vitae sem luctus
      eleifend condimentum vel ipsum. Aliquam consequat odio eget purus ornare,
      tempus tristique dolor efficitur. Suspendisse ante nisl, aliquam ut
      consectetur ac, venenatis ut nisl. Duis congue tempus lectus sed
      sollicitudin. Donec tristique ultricies lacus, at consectetur eros. Donec
      arcu metus, pellentesque nec augue eget, volutpat auctor dolor. Mauris et
      metus augue. Sed accumsan velit erat, ac tempus nunc euismod vitae. Nulla
      porta purus mi, eu egestas elit condimentum sit amet. Morbi nunc orci,
      auctor quis consequat ut, consequat at libero. Nulla facilisi. Morbi
      hendrerit in elit vel posuere. Integer eget augue consectetur, pharetra
      orci vel, ullamcorper est. Proin rhoncus nunc nibh, ut malesuada ipsum
      tempor id. Nullam ac libero odio. Vestibulum a aliquet nulla. Phasellus
      euismod tristique dapibus. Phasellus pellentesque porta lacus a consequat.
      Fusce faucibus ligula elit, quis imperdiet lorem pulvinar non. Donec
      dictum aliquet risus eu bibendum. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Praesent nisl lorem, malesuada sit amet semper
      eu, sodales eget orci. Pellentesque mauris tellus, vulputate vitae
      dignissim et, aliquet ultrices est. Donec in augue libero.
    </div>
  );
};

export default TestStep;
