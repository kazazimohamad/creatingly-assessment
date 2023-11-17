import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Directive({
  selector: '[trackVisibility]',
})
export class TrackVisibilityDirective  implements OnDestroy {
  private observer!: IntersectionObserver;
  private visibilityThreshold = 0.5;
  @Input() manualThreshold!: number;
  @Output() itemViewed = new EventEmitter<void>();

  constructor(
    public el: ElementRef,
    private ngZone: NgZone,
    private breakpointObserver: BreakpointObserver,
    ) {
    this.adjustVisibilityThreshold();
    // this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(this.callback,
{
          rootMargin: '0px',
          threshold: this.manualThreshold || this.visibilityThreshold,
          root: null
        }
      );
      this.observer.observe(this.el.nativeElement);
    // })

  }

  private callback: ConstructorParameters<typeof IntersectionObserver>[0] = (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((_entry) => {
        this.itemViewed.emit();
      });


  private adjustVisibilityThreshold(): void {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.visibilityThreshold = 1;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.visibilityThreshold = 0.7;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.visibilityThreshold = 0.5;
    } else {
      this.visibilityThreshold = 0.1;
    }
  }


  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}
