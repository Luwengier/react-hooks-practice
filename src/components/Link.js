import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', href);

    // 在這邊設定觸發自定義名稱的popstate事件，並於Route設置事件監聽。
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
    );
};

export default Link;